/**
 * MIT License
 *
 * Copyright (c) 2016 Marcelo Camargo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {fromNullable, Just, Nothing} from 'data.maybe'
import {v4} from 'uuid'
import * as browser from 'detect-browser'
import {post} from 'axios'

/**
 * Receives a window object and extracts the necessary information
 * from the user
 * @author Marcelo Camargo <marcelocamargo@linuxmail.org>
 */
module.exports = class CapyTracker {

    /**
     * Pass window to constructor. All the properties we'll access
     * must be exposed in this object
     * @param {object} window - The window object
     * @param {string} api - The API where data will be reported
     */
    constructor(props) {
        this.props = {}
        if (!props || !props.target) {
            throw new Error('Target object is obligatory')
        }

        this.props.target = props.target
        this.props.api = props.api
        this.props.time = props.time || false
    }

    /**
     * Returns a monad for the current session
     * @return {Maybe string}
     */
    getCurrentSession() {
        const sessionId = this.props.target.localStorage.getItem('capy-tracker-session')
        return fromNullable(sessionId)
    }

    /**
     * Starts monitoring the user. Creates a session if it doesn't exist.
     */
    start() {
        const newSession = () => {
            const key = v4()
            this.props.target.localStorage.setItem('capy-tracker-session', key)
            return Just(key)
        }

        this.getCurrentSession()
            .orElse(newSession)
            .chain(key => {
                // When API was provided, tell we have a session
                fromNullable(this.props.api).chain(url => {
                    post(url, {
                        type: 'SESSION',
                        data: this.collectData()
                    })
                })
            })

        if (this.time) {
            this.trackTime()
        }
    }

    /**
     * Tracks how long user takes on our pages
     */
    trackTime() {
        const sessionStart = Date.now()
        this.props.target.onbeforeunload = () => {
            const duration = Date.now() - sessionStart
            // Let's tell the API when user closes the page
            fromNullable(this.props.api).chain(url => {
                post(url, {
                    type: 'DURATION',
                    data: duration
                })
            })
        }
    }

    /**
     * Stops tracking. Kills the current session
     */
    stop() {
        this.props.target.localStorage.removeItem('capy-tracker-session')
    }

    /**
     * Extracts information about location, date and lead session
     * @return {object}
     */
    collectData() {
        const info = this.props.target.location
        return {
            url: {
                hostname: info.hostname,
                pathname: info.pathname
            },
            date: Date.now(),
            browser: {
                name: browser.name,
                version: browser.version
            }
        }
    }
}


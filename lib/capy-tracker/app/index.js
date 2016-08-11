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

/**
 * Receives a window object and extracts the necessary information
 * from the user
 * @author Marcelo Camargo <marcelocamargo@linuxmail.org>
 */
export default class CapyTracker {

    /**
     * Pass window to constructor. All the properties we'll access
     * must be exposed in this object
     * @param {object} window - The window object
     */
    constructor(window) {
        this.window = window;
    }

    /**
     * Extracts information about location, date and lead session
     * @return {object}
     */
    tellInfo() {
        const info = this.window.location;
        return {
            url: {
                hostname: info.hostname,
                pathname: info.pathname
            },
            date: Date.now(),
            session: this.session()
        }
    }

    /**
     * Creates or returns the user session.
     * @return {object}
     */
    session() {
        const getSessionId = () => this.window.localStorage.getItem('capy-tracker-session');
        let sessionId = getSessionId()
        if (undefined === sessionId) {
            // TODO: Find a better way to generate a UID
            this.window.localStorage.setItem('capy-tracker-session', Date.now())
            sessionId = getSessionId()
        }
        return sessionId;
    }
}


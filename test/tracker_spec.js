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
import {expect} from 'chai'
import CapyTracker from '../app/index'
import * as jsdom from 'mocha-jsdom'

describe('CapyTracker', () => {
    describe('Tracker mocker', () => {
        const uuidRegex = /^\w{8}-((\w{4}-){3})\w{12}/

        // Responsible for injecting the necessary information
        jsdom.default({
            url: 'https://news.ycombinator.com/newcomments'
        })

        // As much as jsdom doesn't work with local storage, we need to mock
        // it's behavior based on its spec (at least what we need to use)
        const mockLocalStorage = (win) => {
            win.localStorage = {
                table: {},
                getItem: function (key)        { return this.table[key] },
                setItem: function (key, value) { this.table[key] = value },
                removeItem: function (key)     { delete this.table[key] }
            }
        }

        it('extracts host and path information', () => {
            mockLocalStorage(window)
            const tracker = new CapyTracker(window)

            expect(tracker.collectData().url).to.deep.equal({
                hostname: 'news.ycombinator.com',
                pathname: '/newcomments'
            })
        })

        it('receives the date in a correct format', () => {
            const tracker = new CapyTracker(window)
            expect(tracker.collectData().date).to.match(/\d+/)
        })

        it('creates a valid session when it does not exist', () => {
            const tracker = new CapyTracker(window)
            expect(tracker.getCurrentSession().isNothing).to.be.true
            tracker.start()
            const newSession = tracker.getCurrentSession()

            expect(newSession.isNothing).to.be.false
            expect(tracker.getCurrentSession().isNothing).to.be.false
            expect(newSession.get()).to.match(uuidRegex)
            tracker.stop()
        })

        it('preserves session when it already exists', () => {
            const tracker = new CapyTracker(window)
            expect(tracker.getCurrentSession().isNothing).to.be.true
            tracker.start()
            const newSession = tracker.getCurrentSession()
            expect(newSession.isEqual(tracker.getCurrentSession())).to.be.true
            tracker.stop()
        })

        it('throws an error when no window object is provided', () => {
            expect(() => new CapyTracker()).to.throw('Window object is obligatory')
        })

        it('receives browser info', () => {
            const tracker = new CapyTracker(window)
            const browser = tracker.collectData().browser

            expect(browser.version).to.have.length.of.at.least(2)
            expect(browser.name).to.equal('node')
        })

        it('preserves passed API url', () => {
            const tracker = new CapyTracker(window, 'http://localhost:666/api')
            expect(tracker.api).to.equal('http://localhost:666/api')
        })
    })
})

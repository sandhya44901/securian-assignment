import { browser } from '@wdio/globals'

export default class Page {
    public open (path: string) {
        return browser.url(`https://www.securian.com/insights-tools/retirement-calculator.html`)
    }
}

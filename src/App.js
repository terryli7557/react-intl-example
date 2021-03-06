import React, {Component} from "react";
import {
    IntlProvider,
    FormattedMessage,
    FormattedDate,
    FormattedTime,
    FormattedNumber,
    addLocaleData
} from "react-intl";

import {DatePicker, LocaleProvider} from 'antd';
import "antd/dist/antd.css";

import {localeData, getAntdLocale, getMessagesByLocale} from './locales';

addLocaleData(localeData);

const TimezoneRadio = ({timezone, handleOnChange, currentValue}) => (
    <>
        <input
            type="radio"
            name="timezone"
            id={timezone}
            value={timezone}
            checked={currentValue === timezone}
            onChange={handleOnChange}
        />
        <label htmlFor={timezone}>{timezone}</label>
        <br/>
    </>
);
const LanguageRadio = ({lang, currentValue, handleOnChange}) => (
    <>
        <input
            type="radio"
            name="lang"
            id={lang}
            value={lang}
            checked={currentValue === lang}
            onChange={handleOnChange}
        />
        <label htmlFor={lang}>{lang}</label>
        <br/>
    </>
);

const MessageComponent = ({name, count}) => (
    <>
        <div>===========</div>
        <br/>
        <FormattedMessage
            id="welcome"
            defaultMessage={`Hello {name}, you have {count, number} {count, plural,
                      one {message}
                      other {messages}
                    }`}
            values={{name: <b>{name}</b>, count}}
        />
        <div>
            <FormattedMessage
                id="warning"
                defaultMessage={`This is how I spell colour`}
                values={{name}}
            />
        </div>
        <br/>
        <div>
            <FormattedDate
                value={Date.now()}
            />
            <br/>
            <FormattedDate
                value={Date.now()}
                year="numeric"
                month="long"
                day="numeric"
                weekday="long"
            />
            <br/>

            <FormattedDate
                value={Date.now()}
                year="numeric"
                month="long"
                day="numeric"
            />
            <br/>
            <br/>
            <FormattedTime
                value={Date.now()}
                hour12={false}
            />
            <br/>
            <FormattedTime
                value={Date.now()}
            />
            <br/>
            <br/>
            <FormattedNumber
                value="1000"
                style="currency"
                currency="AUD"
            />
            <br/>
            <br/>
        </div>
    </>
);

class App extends Component {
    state = {
        locale: "en-AU",
        timezone: 'Australia/Sydney',
        users: [
            {
                name: "Tom",
                count: 1000
            },
            {
                name: "John",
                count: 1
            }
        ]
    };

    setLang = ({target}) => {
        const {value} = target;
        this.setState(_ => ({locale: value}));
    };

    setTimezone = ({target}) => {
        const {value} = target;
        this.setState(_ => ({timezone: value}));
    };

    render() {
        const langs = ['en-AU', 'en-US', 'de', 'zh'];
        const timezones = ['Australia/Sydney', 'Asia/Shanghai', 'America/New_York'];
        return (
            <div style={{margin: '10px'}}>
                <LocaleProvider locale={getAntdLocale(this.state.locale)}>
                    <IntlProvider
                        locale={this.state.locale}
                        defaultLocale="en-AU"
                        messages={getMessagesByLocale(this.state.locale)}
                        timeZone={this.state.timezone}>
                        <div>
                            <div>
                                {langs.map((lang, index) => (
                                    <LanguageRadio lang={lang} handleOnChange={this.setLang} key={index}
                                                   currentValue={this.state.locale}/>
                                ))}
                            </div>
                            <br/>
                            <div>
                                {timezones.map((timezone, index) => (
                                    <TimezoneRadio timezone={timezone} handleOnChange={this.setTimezone}
                                                   key={index}
                                                   currentValue={this.state.timezone}/>
                                ))}
                            </div>
                            <br/>

                            {this.state.users.map((user, index) => (
                                <MessageComponent key={index} name={user.name} count={user.count}/>

                            ))}


                            <div><DatePicker/></div>
                        </div>

                    </IntlProvider>
                </LocaleProvider>
            </div>
        );
    }
}

export default App;


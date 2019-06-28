import React from 'react';
import {Helmet} from "react-helmet";

function Head({ languageCode }) {

    switch(languageCode) {
        case 'ru': return (
            <Helmet>
                <html lang="ru" />
                <meta name="description" content="Свод законов древней Месопотамии, принятый вавилонским царем Хаммурапи примерно в 1754 г. до н.э." />
                <meta name="keywords" content="Законы Хаммурапи, законы царя Хаммурапи, кодекс хаммурапи, кодекс царя хаммурапи" />
                <meta name="abstract" content="Электронная версия Законнов Хаммурапи на русском языке" />
                <meta name="author" content="Хаммурапи" />
                <meta name="language" content="Russian" />
                <meta name="web_author" content="Вячеслав Беляев" />
                <meta name="category" content="История, Юриспруденция" />
                <title>Законы Хаммурапи</title>

                <link rel="manifest" href={`${process.env.PUBLIC_URL}/manifest_ru.json`} />
            </Helmet>
        );
        default: return (
            <Helmet>
                <html lang="en" />
                <meta name="description" content="The code of laws of ancient Mesopotamia, adopted by the Babylonian king Hammurabi around 1754 BC." />
                <meta name="keywords" content="Code of Hammurabi, The laws of Hammurabi, the laws of King Hammurabi, the code of Hammurabi, the code of King Hammurabi" />
                <meta name="abstract" content="The electronic version of the Code of Hammurabi in English" />
                <meta name="author" content="Hammurabi" />
                <meta name="language" content="English" />
                <meta name="web_author" content="Slava Belaev" />
                <meta name="category" content="History, Юриспруденция" />
                <title>Code of Hammurabi</title>

                <link rel="manifest" href={`${process.env.PUBLIC_URL}/manifest.json`} />
            </Helmet>
        )
    }
}

export default Head;

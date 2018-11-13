import React from 'react';

declare const CORE_AUTH_UI_URL: string;

const RedirectToLogin = (): null => {
    const redirectUrl = CORE_AUTH_UI_URL;
    const next = window.location.href;

    setTimeout(() => {
        window.location.assign(`${redirectUrl}?next=${encodeURIComponent(next)}`);
    }, 200); // 200 is the shortest interval that i tested that would reliably keep the page we're leaving
             // in chrome's browser history
    return null;
};

export default RedirectToLogin;
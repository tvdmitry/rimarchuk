export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([$?*|{}\\[\]^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
    name: string,
    value: string,
    options: { expires: string } & Record<string, string | number | boolean> = { expires: '' }
) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options,
    };

    if ('expires' in options && options.expires) {
        // todo fix any types
        if ((options.expires as any) instanceof Date) {
            options.expires = (options.expires as any).toUTCString();
        }
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (const optionKey in options) {
        updatedCookie += '; ' + optionKey;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export const useTelegram = () => {
    return (window as any)?.Telegram?.WebApp ?? {};
    // return {
    //     expand: () => {},
    //     BackButton: {
    //         hide: () => {},
    //         offClick: (value: any) => {},
    //         onClick: (value: any) => {},
    //         show: () => {},
    //     },
    //     initDataUnsafe: {
    //         user: {
    //             id: 744529899,
    //             first_name: 'Danya',
    //         },
    //     },
    // };
};

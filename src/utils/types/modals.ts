export type Modals = {
    isOpen: boolean;
    modalType: string;
    firstShow: boolean;
    data: any;
};

export type ModalsResponse = {
    modals: Modals;
};

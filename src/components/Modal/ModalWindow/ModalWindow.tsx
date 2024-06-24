import css from './ModalWindow.module.scss'

interface ModalWindowProps {
    isOpen: boolean;
    close: () => void;
    children: React.ReactNode;
}
export const ModalWindow = ({ isOpen, close, children }: ModalWindowProps) => {
    return (
        isOpen && (
            <div className={css.ModalWindowWrapper}>
                {children}
                <div className={css.ModalWindowBackground} onClick={close}></div>
            </div>
        )
    );
};

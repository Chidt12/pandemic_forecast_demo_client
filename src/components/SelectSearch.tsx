import React, { useEffect, useState } from "react";
import Select from 'react-select';

const selectStyles = {
    control: (provided: any) => ({ ...provided, minWidth: 200, margin: 8 }),
    menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

export type SearchItem = {
    value: string,
    label: string
}

interface Props {
    data: SearchItem[],
    placeholder?: string,
    searchPlaceholder?: string,
    onChangeFunc?: (e: SearchItem) => void,
    value?: string,
    className?: string,
    defaultValue?: string
}

const SelectSearch = ({
    data = [],
    value = '',
    className = "w-full cursor-pointer outline-none focus:outline-none border border-black border-opacity-20 focus:border-opacity-90 px-4 py-2 rounded text-base",
    defaultValue = '',
    searchPlaceholder = "Tìm kiếm ...",
    placeholder = "Chọn ...",
    onChangeFunc }: Props
) => {
    const [isOpen, setOpen] = useState(false);
    const [valueIn, setValueIn] = useState<any | null>(null);

    const toggleOpen = () => { setOpen(!isOpen) }

    const onSelectChange = (value: any) => {
        toggleOpen();
        setValueIn(value);
        if (onChangeFunc) {
            onChangeFunc(value);
        }
    }

    const onBlur = () => {
        if (!valueIn) {
            setValueIn(data.find(x => x.value == defaultValue) ? data.find(x => x.value == defaultValue): null);
        }
    }

    useEffect(() => {
        if (value) {
            setValueIn(data.find(x => x.value == value) ? data.find(x => x.value == value): null);
        }
        else {
            setValueIn(data.find(x => x.value == defaultValue) ? data.find(x => x.value == defaultValue) : null);
        }
    }, [defaultValue, value])

    return (
        <>
            <Dropdown
                isOpen={isOpen}
                onClose={toggleOpen}
                target={
                    <div
                        onClick={toggleOpen}
                        className={className}>
                        {valueIn ? valueIn.label : placeholder}
                    </div>
                }
            >
                <Select
                    autoFocus
                    components={{ DropdownIndicator: null, IndicatorSeparator: null }}
                    backspaceRemovesValue={false}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    menuIsOpen
                    onChange={onSelectChange}
                    onBlur={onBlur}
                    options={data}
                    placeholder={placeholder}
                    styles={selectStyles}
                    tabSelectsValue={false}
                    value={valueIn}
                />
            </Dropdown>
        </>
    );
}
// styled components

const Menu = (props: any) => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
                marginTop: 8,
                position: 'absolute',
                width: '100%',
                zIndex: 2,
            }}
            {...props}
        />
    );
};
const Blanket = (props: any) => (
    <div
        style={{
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
            position: 'fixed',
            zIndex: 1,
        }}
        {...props}
    />
);


const Dropdown = ({ children, isOpen, target, onClose }: { children: any, isOpen: boolean, target: any, onClose: any }) => (
    <div style={{ position: 'relative' }}>
        {target}
        {isOpen ? <Menu>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
);

export default SelectSearch;



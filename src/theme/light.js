import {
    INPUT_BGC,
    PRIMARY_COLOR,
    TEXT_PRIMARY,
    WHITE,
} from "../constant/ColorConstant.js";

export const lightToken = {
    colorPrimary: PRIMARY_COLOR,
    fontFamily: "'Poppins', sans-serif",
    colorTextBase: TEXT_PRIMARY,
    fontSize: 14,
    borderRadius: 2,
}

export const lightComponentsToken = {
    Input: {
        controlHeight: 44,
        activeShadow: "0 0",
        colorBgContainer: INPUT_BGC,
        colorBorder: WHITE,
    },
    InputNumber: {
        controlHeight: 44,
        activeShadow: "0 0",
        colorBgContainer: INPUT_BGC,
        colorBorder: WHITE,
    },
    Select: {
        optionSelectedBg: PRIMARY_COLOR,
        optionSelectedColor: WHITE,
    },
    Table: {
        colorFillAlter: WHITE,
        headerBorderRadius: 0
    },
    Button: {
        controlHeight: "44px",
        borderRadius: "2px",
        fontWeight: 600,
    },
    Radio: {
        buttonSolidCheckedBg: PRIMARY_COLOR,
    },
    Menu: {
        itemHeight: 44,
        fontSize: 16,
    },
    Modal: {
        borderRadiusLG: 5,
        titleFontSize: 20
    },
    Form: {
        itemMarginBottom: 14
    },
    Checkbox: {
        borderRadiusSM: 0,
        controlInteractiveSize: 20,
        // colorPrimary: PRIMARY_COLOR,
        // colorWhite: WHITE,
    },
    Tag: {
        fontSizeSM: 13,
    },
    Dropdown: {
        paddingBlock: 12
    },
    Switch: {
        colorPrimary: PRIMARY_COLOR
    },
}

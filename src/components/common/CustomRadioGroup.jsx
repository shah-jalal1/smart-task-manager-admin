import {Radio} from "antd";

import "./custom_radio_group.scss";

const CustomRadioGroup = ({radioBtnWidth = "50%", radioOptions, value, onChange}) => {

    return (
        <div className="custom-radio-group">
            <Radio.Group
                buttonStyle="solid"
                style={{width: "100%"}}
                value={value}
                onChange={onChange}
            >
                {
                    radioOptions.map(radioOption =>
                        <Radio.Button
                            value={radioOption.value}
                            key={radioOption.value}
                            style={{width: radioBtnWidth}}
                        >
                            {radioOption.name}
                        </Radio.Button>
                    )
                }
            </Radio.Group>
        </div>
    );
};

export default CustomRadioGroup;

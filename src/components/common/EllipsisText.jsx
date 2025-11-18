import {Flex, Tooltip, Typography} from 'antd';
import {PRIMARY_COLOR} from '../../constant/ColorConstant';

const {Paragraph} = Typography;

const EllipsisText = ({onClick = null, mark = false, style, text, extension = '', rows = 3, isTooltip = false}) => {

    const displayText = extension ? text.replace(new RegExp(`\\.${extension}$`, 'i'), '') : text;

    return (
        <Tooltip title={isTooltip ? text : ''}>

            <Flex
                align="center"
                style={{display: 'inline-flex', ...style}}
                onClick={onClick}
            >

                <Paragraph
                    mark={mark}
                    ellipsis={{
                        rows: rows,
                        expandable: false,
                        symbol: '...',
                        suffix: extension ? (
                            <span style={{color: PRIMARY_COLOR, flexShrink: 0, marginLeft: 2}}>
                                .{extension}
                            </span>
                        ) : '',
                    }}
                    style={{
                        margin: 0,
                        display: 'inline',
                        whiteSpace: 'normal',
                        ...style,
                    }}
                >
                    {displayText}
                </Paragraph>

            </Flex>

        </Tooltip>
    );
};

export default EllipsisText;
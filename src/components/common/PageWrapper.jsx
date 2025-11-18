import React, {Fragment} from 'react';

const PageWrapper = ({pageHeader, pageSubheader, pageTabHeader, children}) => {
    return (
        <Fragment>
            <div className="page-header">
                {pageHeader}
            </div>
            {
                pageSubheader ? <div className="page-subheader">
                    {pageSubheader}
                </div> : null
            }
            {
                pageTabHeader ? <div className="page-tab-header">
                    {pageTabHeader}
                </div> : null
            }
            {
                !pageTabHeader ? <div className={`${pageSubheader ? "page-content-two" : "page-content"}`}>
                    {children}
                </div> : null
            }
        </Fragment>
    );
}

export default PageWrapper;

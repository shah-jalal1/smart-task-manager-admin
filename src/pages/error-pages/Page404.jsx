import {PAGE_404_PATH} from "../../routes/Slug";
import ErrorLayout from "../../components/layout/ErrorLayout.jsx";

const Page404 = () => {
    return (
        <ErrorLayout
            status={404}
            title={404}
            subTitle="Sorry, the page you visited does not exist."
            btnName="Go To Home"
            pathName={PAGE_404_PATH}
        />
    );
}

export default Page404;

import {PAGE_500_PATH} from "../../routes/Slug";
import ErrorLayout from "../../components/layout/ErrorLayout.jsx";

const Page500 = () => {
    return (
        <ErrorLayout
            status={500}
            title={500}
            subTitle="Sorry, something went wrong. Please try again later."
            btnName="Go To Home"
            pathName={PAGE_500_PATH}
        />
    );
}

export default Page500;

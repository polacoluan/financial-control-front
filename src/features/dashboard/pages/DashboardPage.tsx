import { SpentMoney } from "../components/SpentMoney";
import { SpentPerCardChart } from "../components/SpentPerCardChart";
import { SpentPerCategoryChart } from "../components/SpentPerCategoryChart";
import { SpentPerDateChart } from "../components/SpentPerDateChart";
import { SpentPerTypeChart } from "../components/SpentPerTypeChart";

const DashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-4 m-2">
            <div><SpentPerCategoryChart /></div>
            <div><SpentPerTypeChart /></div>
            <div><SpentPerCardChart /></div>
            <div><SpentPerDateChart /></div>
            <div className="grid gap-4">
                <SpentMoney />
            </div>
        </div>
    );
}

export default DashboardPage;
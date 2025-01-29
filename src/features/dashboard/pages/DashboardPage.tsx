import { SpentPerCategoryChart } from "../charts/SpentPerCategoryChart";

const DashboardPage = () => {
    return (
        <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2"><SpentPerCategoryChart /></div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">02</div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">03</div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">04</div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">05</div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">06</div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">07</div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">08</div>
            <div className="p-10 rounded-xl bg-sky-900 text-center">09</div>
        </div>
    );
}

export default DashboardPage;
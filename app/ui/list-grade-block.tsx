import { useEffect, useState } from "react";
import { FetchData } from "./data";
import { BoulderAreaItem } from "./list-boulder-item";
import config from "~/config";


export function GradeBlock({ grade, type }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function load() {
            const boulders = await FetchData(`${config.baseUrl}/stats/boulders/${type}/${grade}`);
            setData(boulders);
        }
        load();
    }, []);
    if (!data.length) return null;

    return (
        <div className="my-4">
            <h1 className="text-xl font-bold mb-2">{grade}</h1>
            <div className="mx-3">
                {data.map((item) => <BoulderAreaItem key={item.boulder.id} item={item} />)}
            </div>
        </div>
    );
}
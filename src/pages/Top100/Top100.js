import { useEffect, useState } from "react";

import BoxMusic from "../../components/BoxMusic/BoxMusic";
import Loading from "../../components/Loading/Loading";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";


function Top100() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
        request.get(apiPath.top100).then((res) => {
            setLoading(false)
            setData(res.data)
        })
    }, [])
    if (loading) {
        return <Loading></Loading>;
    }
    else {

        return (
            <>
                {
                    data.map((item, index) => {
                        return <div key={index}>
                            <h2 className="ooms-title-head">{item.title}</h2><div className="ooms-home-top" >
                                {item?.items?.map((item2, index2) => {
                                    return <BoxMusic props={item2} key={index2}></BoxMusic>;
                                })}
                            </div>
                        </div>

                    })
                }
            </>
        )
    }
}

export default Top100;
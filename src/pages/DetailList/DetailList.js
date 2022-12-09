import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import request from "../../ultis/axios";

function DetailList() {
    const location = useLocation();
    var id = location.state;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        request.get(`/playlist/${id}`).then((res) => {
            console.log(res);
            setLoading(false)
        })
    }, [id])
    if (loading) {
        return <Loading></Loading>
    }
    else {
        return (
            <h1>Detail List</h1>
        );
    }


}

export default DetailList;
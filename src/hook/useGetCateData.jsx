import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../fbase";
import { useLayoutEffect, useState } from "react";

function useGetCateData(userUid) {

    //사용자의 카테고리 데이터 가져오기
    //CategoryList와 CreateLink(데이터 보여주기)에 필요한 Hook
    const cate = collection(db, 'cate');
    const [data, setData] = useState([]);

    //카테고리 데이터 가져오기
    async function getInfo() {
        const myData = query(cate, where("uid", "==", userUid));
        const querySnapshot = await getDocs(myData);
        const newData = [];
        await querySnapshot.forEach((doc) => {
            newData.push(doc.data())
        });
        return newData
    }

    //캐시 데이터 여부에 따라 데이터 불러오기
    useLayoutEffect(() => {
        async function getData() {
            const cachedData = localStorage.getItem('cachedData')
            if (cachedData) setData(JSON.parse(cachedData))
            else {
                const newData = await getInfo();
                localStorage.setItem('cachedData', JSON.stringify(newData))
                setData(newData);
            }
        }
        getData();
    }, [userUid])

    // 카테고리 데이터 변경(추가, 삭제)시 로컬 스토리지 데이터 새로 갱신
    async function setCateLocalData() {
        const data = await getInfo();
        localStorage.setItem('cachedData', JSON.stringify(data));
        setData(data);
    }

    return { data, setCateLocalData };
}

export default useGetCateData;
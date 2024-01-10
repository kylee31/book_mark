import { collection, getDocs, query, where } from "firebase/firestore";
import { useLayoutEffect, useState } from "react";
import { db } from "../fbase";

function useGetLinkData({ userUid, myname }) {

    const flink = collection(db, 'link');
    const [data, setData] = useState([]);

    //카테고리에 해당하는 링크 데이터 가져오기
    async function getInfo() {
        const myData = query(flink, where("uid", "==", userUid));
        const querySnapshot = await getDocs(myData);
        let newData = [];
        await querySnapshot.docs.filter(doc => doc.data().name === myname).forEach((doc) => {
            newData.push(doc.data())
        });
        return newData
    }

    //캐시 데이터 여부 확인하고 데이터 불러오기
    //카테고리와 다른 점은 카테고리명과 동일한 키 값의 데이터를 한번 더 찾아주어야 함
    useLayoutEffect(() => {
        async function getData() {
            let obj = {};
            let cachedItem = localStorage.getItem('cachedItem');
            if (cachedItem) {
                let linksItem = JSON.parse(cachedItem)
                if (linksItem[myname]) {
                    setData(linksItem[myname])
                }
                else {
                    let links = await getInfo();
                    obj[myname] = links;
                    let newData = { ...linksItem, ...obj }
                    localStorage.setItem('cachedItem', JSON.stringify(newData))
                    setData(links)
                }
            }
            else {
                let links = await getInfo();
                obj[myname] = links;
                localStorage.setItem('cachedItem', JSON.stringify(obj));
                setData(links)
            }
        }
        getData();
    }, [userUid, myname])

    //링크 추가, 삭제 시 데이터 재정렬
    //추가,삭제되는 링크의 name을 보고 해당 데이터만 덮어씌우면 된다.
    //객체이므로 spread 연산자를 사용하여 해당 데이터만 새로 정의하여 저장해주기
    async function setLinkLocalData() {
        let links = await getInfo();
        let obj = {};
        obj[myname] = links;
        const data = localStorage.getItem('cachedItem');
        let saveData = { ...JSON.parse(data), ...obj }
        await localStorage.setItem('cachedItem', JSON.stringify(saveData)) //local에는 전체 데이터 저장
        setData([...links]) //data에는 카테고리에 해당하는 데이터만 저장
    }

    return { data, setLinkLocalData }
}

export default useGetLinkData;
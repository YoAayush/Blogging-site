import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import './New.css'
import { toast } from "react-toastify";
import { dataCollection } from "../firebase/Firebase";
import { arrayUnion, doc, getDoc, query, setDoc } from "firebase/firestore";

export default function Different(prop) {
    // console.log(prop);

    const { Heading, id } = useParams();
    const decodeHeading = decodeURI(Heading);
    const decodeID = decodeURI(id);
    // const [CommentList, setCommentList] = useState([]);
    const [fetchComments, setFetchComments] = useState([]);

    const not_login = () => { toast("please do login first") };
    const Successfull_submit = () => { toast("successfully submitted the commen") };
    const empty_field = () => { toast("field should not be empty"); }

    // useEffect(() => {
    //     console.log(prop.login, prop.userid);
    // }, [prop.login]);

    // useEffect(() => {
    //     console.log(decodeHeading);
    //     console.log(decodeID);
    // }, [decodeHeading, decodeID]);

    const [Theme, setTheme] = useState([]);

    useEffect(() => {
        if (prop.data[0].Heading == decodeHeading) {
            setTheme(prop.data[0].Mobile_Phones[decodeID].Data);
        } else if (prop.data[1].Heading == decodeHeading) {
            setTheme(prop.data[1].GPUs[decodeID].Data);
        } else if (prop.data[2].Heading == decodeHeading) {
            setTheme(prop.data[2].Artifficial_Intelligence[decodeID].Data);
        }
    }, [prop.data, decodeHeading]);

    const share = () => {
        let curr_url = window.location.href;
        navigator.clipboard.writeText(curr_url);
    }

    const What_share = () => {
        let curr_url = window.location.href;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(curr_url)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleSubmitComment = async () => {
        if (prop.login) {
            if (document.getElementById("comment").value === "") {
                empty_field();
                return;
            }
            const comment = document.getElementById("comment").value;
            // setCommentList([...CommentList, comment]);
            const docRef = doc(dataCollection, `${decodeHeading}-${decodeID}`);
            await setDoc(docRef, { comments: arrayUnion(comment) }, { merge: true });  // Use arrayUnion to add the comment to the existing array
            setFetchComments(prevComments => [...prevComments, comment]);   // Update local state with the new comment
            Successfull_submit();
            document.getElementById("comment").value = "";
            console.log(fetchComments);
            // console.log(CommentList);
        } else {
            not_login();
        }
    }

    const getDataFromFirebase = async () => {
        const docref = doc(dataCollection, `${decodeHeading}-${decodeID}`);
        const docSnap = await getDoc(docref);
        if (docSnap.exists()) {
            const updatedComments = docSnap.data().comments;
            setFetchComments(updatedComments);
            console.log("fetchComments - comments: ", updatedComments);
        } else {
            console.log("no data found in database");
        }
    }

    useEffect(() => {
        getDataFromFirebase();
    }, [])

    // const comment_del = (str, index) => {
    //     let list = [];
    //     let list1 = [];
    //     for (let i = 0; i < fetchComments[0].length; i++) {
    //         if (i != fetchComments[0].indexOf(str)) {
    //             list.push(CommentList[i]);
    //             list1.push(fetchComments[0][i]);
    //             console.log(CommentList[i]);
    //         }
    //     }
    //     setCommentList(list);
    //     setFetchComments(list1);
    //     index = index + 1;
    // }

    return (
        <>
            <div id="new">
                <div className="title-ShareBTN">
                    <div className="title">
                        <h4>{Theme.Title}</h4>
                    </div>
                    <div className="btn">
                        <button onClick={() => { share() }}>Article URL <img src="/article.png" alt="article-copy-icon" /></button>
                        <button onClick={() => { What_share() }}>Share <img src="/whatsapp.png" alt="article-copy-icon" /></button>
                    </div>
                </div>
                <div className="image">
                    <img src={Theme.Image_URL} alt="" loading="lazy" />
                    <div className="date">
                        <p>{Theme.Date_of_Publish}</p>
                    </div>
                </div>
                <div className="content">
                    {
                        Array.isArray(Theme.Long_desc) ? Theme.Long_desc.map((line) => (
                            <p>{line}</p>
                        )) : null
                    }
                </div>
                <div className="comment-sec">
                    <h3>Add comment</h3>
                    <div className="do-submit-comment">
                        <textarea id="comment" />
                        <input type="submit" value="Submit" onClick={() => { handleSubmitComment() }} />
                    </div>
                    {
                        fetchComments ?
                            <div className="show-comment">
                                {
                                    fetchComments.map((str, index) => {
                                        return (
                                            <p key={index}>
                                                {str}
                                                {/* <img src="/delete-icon.png" alt="" onClick={() => { comment_del(str, index) }} /> */}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </>
    )
}





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import './New.css'
// import { toast } from "react-toastify";

// export default function Different(prop) {

//     const not_login = () => { toast("please do login first") };
//     const Successfull_submit = (e) => { toast(`successfully submitted the commen , ${e}`) };

//     const [CommentList, setCommentList] = useState([]);

//     // console.log(prop);
//     const { Heading, id } = useParams();
//     const decodeHeading = decodeURI(Heading);
//     const decodeID = decodeURI(id);

//     const [Theme, setTheme] = useState([]);

//     useEffect(() => {
//         if (prop.data[0].Heading == decodeHeading) {
//             setTheme(prop.data[0].Mobile_Phones[decodeID].Data);
//         } else if (prop.data[1].Heading == decodeHeading) {
//             setTheme(prop.data[1].GPUs[decodeID].Data);
//         } else if (prop.data[2].Heading == decodeHeading) {
//             setTheme(prop.data[2].Artifficial_Intelligence[decodeID].Data);
//         }
//     }, [prop.data, decodeHeading]);

//     const share = () => {
//         let curr_url = window.location.href;
//         navigator.clipboard.writeText(curr_url);
//     }

//     const What_share = () => {
//         let curr_url = window.location.href;
//         const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(curr_url)}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     const handleSubmitComment = () => {
//         if (prop.login) {
//             const comment = document.getElementById("comment").value;
//             setCommentList([...CommentList, comment]);
//             Successfull_submit(comment);
//             console.log(CommentList);
//         } else {
//             not_login();
//         }
//     }

//     return (
//         <>
//             <div id="new">
//                 <div className="title-ShareBTN">
//                     <div className="title">
//                         <h4>{Theme.Title}</h4>
//                     </div>
//                     <div className="btn">
//                         <button onClick={() => { share() }}>Article URL <img src="/article.png" alt="article-copy-icon" /></button>
//                         <button onClick={() => { What_share() }}>Share <img src="/whatsapp.png" alt="article-copy-icon" /></button>
//                     </div>
//                 </div>
//                 <div className="image">
//                     <img src={Theme.Image_URL} alt="" loading="lazy" />
//                     <div className="date">
//                         <p>{Theme.Date_of_Publish}</p>
//                     </div>
//                 </div>
//                 <div className="content">
//                     {
//                         Array.isArray(Theme.Long_desc) ? Theme.Long_desc.map((line) => (
//                             <p>{line}</p>
//                         )) : null
//                     }
//                 </div>
//                 <div className="comment-sec">
//                     <h3>Add comment</h3>
//                     <div className="do-submit-comment">
//                         <textarea id="comment" />
//                         <input type="submit" value="Submit" onClick={() => { handleSubmitComment() }} />
//                     </div>
//                     <div className="show-comment">
//                         {
//                             CommentList.map((str, index) => {
//                                 return (
//                                     <p key={index}>{str}</p>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


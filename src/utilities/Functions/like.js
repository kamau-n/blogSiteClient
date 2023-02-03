import axios from "axios";
const like = (id) => {
    axios
        .post("http://localhost:8000/blog/like", {
            blogsId: id,
            userId: 2,
        })
        .then((results) => {
            console.log(results.data);
            alert(results.data.msg);
        })
        .catch((error) => {
            console.log(error);
        });
}

export { like }
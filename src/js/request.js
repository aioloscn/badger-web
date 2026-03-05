window.badgerHttp = axios.create({
    timeout: 8000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

window.httpPost = function (url, data, headers) {
    return window.badgerHttp.post(url, data, { headers: headers || {} }).then(function (resp) {
        return resp.data;
    }).catch(function (error) {
        console.error("POST请求失败:", error);
        return { code: 500, msg: "请求失败，请稍后重试" };
    });
};

window.httpGet = function (url, params) {
    return window.badgerHttp.get(url, { params: params || {} }).then(function (resp) {
        return resp.data;
    }).catch(function (error) {
        console.error("GET请求失败:", error);
        return { code: 500, msg: "请求失败，请稍后重试" };
    });
};

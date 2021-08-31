import axios from "axios";

export const fetchUser = () => {
  return axios.get("http://192.168.1.13:6001/v1/user", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxM2YzNmE5N2YwMjUwYmMyZWUxMjhiNTcyYjg1ZmFhNCIsImV4cCI6MTYzMDMyNjA5MCwic3ViIjoiZDAxNGI4YWQ3YzQ3Zjk2ZGUzY2VkZmUxMGU2ODYxMGEiLCJzY29wZSI6ImFsbCJ9.nHg-u9EMutPhAk-TmFOIlW7tGVnX0pBFyWU2gfg7snJAqYbarHRJKsXTy3YHsa1soY83bBzHFD6wuqOnNxnHhA`,
      "Client-Id": "13f36a97f0250bc2ee128b572b85faa4",
    },
  });
};

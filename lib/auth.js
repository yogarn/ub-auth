import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import * as cheerio from "cheerio";

const SIAM_URL = "https://siam.ub.ac.id/";

const cookieJar = new CookieJar();
const axiosInstance = wrapper(
  axios.create({
    baseURL: SIAM_URL,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: `${SIAM_URL}`,
    },
    withCredentials: true,
    maxRedirects: 5,
    jar: cookieJar,
  })
);

export async function auth({ username, password }) {
  const params = new URLSearchParams({
    status_loc: "Unable to retrieve your location",
    lat: "",
    long: "",
    username,
    password,
    login: "Masuk",
  });

  const response = await axiosInstance.post("index.php", params);

  if (response.status !== 200) {
    throw new Error("Failed to authenticate");
  }

  const redirectUrl = response.request.res.responseUrl;

  if (redirectUrl.includes("index.php")) {
    throw new Error("Login failed, check your credentials.");
  }

  const redirectResponse = await axiosInstance.get(redirectUrl);

  const jenjangFakultas = extractValue(
    redirectResponse.data,
    "Jenjang/Fakultas"
  );

  const $ = cheerio.load(redirectResponse.data);
  const nim = $(".textgreen b").text().trim();
  const nama = $(".bio-name").text().trim();

  const jurusan = extractValue(redirectResponse.data, "Jurusan");
  const programStudi = extractValue(redirectResponse.data, "Program Studi");
  const seleksi = extractValue(redirectResponse.data, "Seleksi");
  const nomorUjian = extractValue(redirectResponse.data, "Nomor Ujian");

  return {
    data: {
      nim,
      nama,
      jenjangFakultas,
      jurusan,
      programStudi,
      seleksi,
      nomorUjian,
    },
  };
}

function extractValue(html, label) {
  const regex = new RegExp(
    `${label}<i class="fa fa-angle-right"></i></span>([^<]+)`
  );
  const match = regex.exec(html);
  return match ? match[1].trim() : null;
}

export default auth;

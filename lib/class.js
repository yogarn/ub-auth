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

export async function getClasses({ username, password, isPendek }) {
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

  const classesResponse = await axiosInstance.get(`${SIAM_URL}/class.php`, {
    is_pendek: isPendek,
  });

  if (classesResponse.status !== 200) {
    throw new Error("Failed to retrieve schedule");
  }

  const $ = cheerio.load(classesResponse.data);
  const data = [];
  const headers = [
    "hari",
    "jam",
    "kelas",
    "kode",
    "mataKuliah",
    "tahunKurikulum",
    "dosen",
    "ruang",
    "jenis",
  ];

  $('table[cellpadding="3"][cellspacing="1"][border="0"][width="650"] tr').each(
    function (rowIndex) {
      if (rowIndex === 0) return;

      const row = {};
      $(this)
        .find("td")
        .each(function (index) {
          if (index < headers.length) {
            row[headers[index]] = $(this).text().trim();
          }
        });

      if (Object.keys(row).length === headers.length) {
        data.push(row);
      }
    }
  );

  if (data.length === 0) {
    throw new Error("No class found");
  }

  return { data };
}

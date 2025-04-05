
import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers';

type MyTokenPayload = {
    email: string;
  };

  async function getEmailByToken() {

        const cookieStore = cookies(); // pas de await ici
        const token = (await cookieStore).get("token")?.value as string;
        const decode = jwtDecode<MyTokenPayload>(token)
        console.log("param request : ", decode.email)
        const param = decode.email
        return param
}
export{getEmailByToken}

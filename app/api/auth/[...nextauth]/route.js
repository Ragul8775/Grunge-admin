import NextAuth, { getServerSession } from "next-auth/next";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../lib/mongodb";
const adminEmail = ['ragulsankar2711@gmail.com',"hostgrunge@gmail.com"]

export const authOptions ={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks:{
    session:({session,token,user})=>{
    if(adminEmail.includes(session?.user?.email)){
         return session;
    }else{
      return false
    }
    },
  }
  
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
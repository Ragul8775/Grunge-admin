export const POST = async (req)=>{
    try {
        return new Response(JSON.stringify("Hello"))
    } catch (error) {
        console.log(error)
    }
}
export default async function userDataAPI(){
   try {
        const fetchAPI = await fetch('https://jsonplaceholder.typicode.com/users');
        if(fetchAPI.ok){
            const jsonResponse = await fetchAPI.json();
            return jsonResponse;
        }else{
            console.log('Error fetch API Users');
            return [];
        }
   } catch (error) {
     console.error(error);
     return [];
   }
} 
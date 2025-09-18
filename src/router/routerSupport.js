import router from './index'
export default function(path,query,title){
	router.push({path,query})
	let nowPath = this.$route.path.replace("/","")
	router.addRoute(
		{
			path:"/"+path,
			component:() => import("@/views/"+path),
		}
	)
	//this.$route.fullPath
	router.push({path,query})
	document.title = title
}
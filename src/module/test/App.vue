<template>
    <div id='app'>
         <div class="imgBox">
            <input type="file" class="inputstyle" name="file" @change="PreviewImage"  />
            <img :src="imageUrl" alt="" class="fileImg">
        </div>

    </div>
</template>
<script type="text/javascript">
export default {
	data(){
		return {
			imageUrl: ""
		}
	},
	methods: {

		   PreviewImage(event){
                var addr = 'http://oxqmde0yk.bkt.clouddn.com/'
                var file = event.target.files[0];
                var formData = new FormData();
                formData.append('file', file);
               let QnToken = getCookie('QnToken');
                formData.append('token', QnToken);
                $.ajax({
                    url: 'http://up.qiniup.com',
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success:(res)=>{
                    	this.imageUrl= addr+res.key;   
                    	console.log(res);
                    }
                });
            },
	}
}
</script>
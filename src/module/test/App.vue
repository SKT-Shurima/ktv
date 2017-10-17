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
                var addr = 'http://opf2ucy0n.bkt.clouddn.com/'
                var file = event.target.files[0];
                var formData = new FormData();
                formData.append('file', file);
                formData.append('token', "tJ3hqsL7aUoZuxOofP7QRlRkDPiNXfmS2ZAfdRuA:0m3hp9M6tuWlUi18wfRNPGWGrUI=:eyJzY29wZSI6Imhka3R2IiwiZGVhZGxpbmUiOjE1MDgxMjY4MjJ9");
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
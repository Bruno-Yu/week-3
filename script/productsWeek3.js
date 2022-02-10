// 預計製作步驟
// mounted
// 1. 先將token跟path 放入data中
// 2. 自動夾帶token進header
// 3. check api 進行身分驗證
// 4. axios get 進行data資料帶入
// 5. 執行資料渲染

// 畫面呈現
// 加入對應的html 產品細節 顯示按鈕
// 加入對應的html 產品細節 顯示畫面
// v-for 掛載data產品資料於畫面
// 建立getData渲染方法


// 新增產品視窗
// 新增按鈕功能建立


// 編輯產品視窗
// 編輯產品按鈕功能建立
// 帶入目標btn-id



// 實作紀錄
// 建立vue元件
// 先定義data內容
// 編輯以及新增
// 開出modal 以及確認編輯是兩個步驟兩個方法
// 開出modal
// 確認編輯

// 新增產品
// v-modal串接兩方data
// 圖片上傳功能建立 (下次做)

// 確認按鈕，上傳axios
// 取消按鈕，清空productDisplay




const app=Vue.createApp({
    data(){
        return{
            // 呈現的產品資料
            productsList:null,
            // 產品細節、編輯、新增使用data
            productDisplay:{
                imagesURL:[],
            },
            name:"我建好了Vue元件",
            url:'https://vue3-course-api.hexschool.io/v2',
            path:'brunoyu2022',
            // 各按鈕狀態，讓html 中的v-if能辨識
            // 細節
            detailDisplay:false,
            // 新增
            newproduct:false,
            // 編輯
            editproduct:false,
            // 刪除
            deleteproduct:false,
            // 新增與編輯的 MODAL title
            newTitle:'新增產品',
            editTitle:'編輯產品',
            // 加入新增&編輯DOM的方法
            bsNewproduct:null,
            // 加入刪除DOM的BS方法
            bsDeleteproduct:null,
        

            // // DOM MODAL呈現的內容
            // // 由於在html作業模板中，新增與編輯功能是在一起的，所以modal呈現部分這邊用同一個變數，對應點擊"編輯" "新增" 的按鈕用method方式將 不同的動態視窗呈現
            // productEditnNew:null,
            // productDelete:null, 
            // 測試用token
            // token: "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjQzMjY4MzczLCJ1c2VyX2lkIjoiQTlFUkZrVXZCZmRySFl5eTJaMXAwV1djbTZnMSIsInN1YiI6IkE5RVJGa1V2QmZkckhZeXkyWjFwMFdXY202ZzEiLCJpYXQiOjE2NDMyNjgzNzMsImV4cCI6MTY0MzcwMDM3MywiZW1haWwiOiJicnVub3l1MjAyMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYnJ1bm95dTIwMjJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.etfT_5V-o_Qcp0vXk6wCnGco7bqkEKklU2-fe92nElVpHxoChD7_AYz6c8_WPwMo6vhshkkNXh69S8S9iNq6P8NSq1sZWDFF8DPCAASs2zy97ui2S-JY_jLRqguy0yT9301klz0K4MzRa2HuWxsh97bWwkXzpaORJzhGt8jRUtflaOLt9Ym7bFNX3DuFsvQ438mhqEsGJSJuP4BJGKQRGPX5Omoevg-yrQJ6OTuRB70uzBfeWRQixJlM9ZN1xEitrS-Zktq5XkhRfBvYjiLzFUPX5QAu0PpjG8Jf7E-OhoUHH2gXcHY3Jta5NDScJo1lD4I97KBzTK_sFZkJIP77CQ",
            // expired:"1643700373683" ,
        }
    },
    methods:{
      // 修改 1: 由於不用自行新增id，將GrnNonDuplicateID拿掉
        // 生成隨機id
        // GenNonDuplicateID(){
        //     return Math.random().toString(19)
        //   },
        // 渲染資料到畫面上
        getData(){
            axios.get(`${this.url}/api/${this.path}/admin/products/all`)
            // 成功結果接收
            .then((res)=>{
                // 取得的結果為雙層物件，key是id value是內容
                // console.log("成功取得資料");
                // console.log(res.data.products);
                this.productsList=res.data.products;
              })
            //   若data取得失敗
              .catch((error)=>{
                console.dir(error);
                alert(`${error.data.message}`);
    
              })
        },
          

        //  確認新增、編輯資料上傳與資料更新
        updateData(){
            // 新增資料
            if(this.newproduct){
                // 取modal上使用者輸入的資料 v-modal串聯
                // 取得隨機id
                // this.productDisplay.id=this.GenNonDuplicateID();
                // console.log(this.productDisplay);
                // const that=this.productDisplay;
                // const Newdata={'${that.id}':that};
                //加入後端
                axios.post(`${this.url}/api/${this.path}/admin/product`,{data:this.productDisplay})
                .then((response) => {
                  alert(response.data.message);
                  this.newproduct=false; 
                  this.bsNewproduct.hide();
                  this.getData();
                }).catch((err) => {
                  alert(err.data.message);
                })

              
            }else if(this.editproduct){
                // 更改
                axios.put(`${this.url}/api/${this.path}/admin/product/${this.productDisplay.id}`, { data: this.productDisplay })
                .then((response) => {
                    this.editproduct=false;
                  alert(response.data.message); 
                  this.bsNewproduct.hide();
                  this.getData();
                }).catch((err) => {
                  alert(err.data.message);
                })

            };

        },
        // 產品刪除視窗開啟
        deleteModal(status,item){
            // 清空productDisplay
            this.productDisplay={
                imagesURL:[],
            };
            // 目標放入displayProduct
            this.productDisplay=item;
            this.deleteproduct=true;
            this.bsDeleteproduct.show();
        },
        // 產品刪除並在後端移除
        deleteTarget(){
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.productDisplay.id}`)
                .then((response) => {
                    this.deleteproduct=false;
                  alert(response.data.message); 
                  this.bsDeleteproduct.hide();
                  this.getData();
                }).catch((err) => {
                  alert(err.data.message);
                })
        },


        // 新增與編輯功能，開啟modal視窗
        EditnNew(status, item){
            // 判斷點到編輯或是新增 使用dataset.editId 是truethy value 是的話就是編輯，不是的話就是新增
            // 編輯做法
            if(status==='edit'){
                // 帶入編輯目標的內容
                // 清空上次留下的內容
                this.productDisplay={
                    imagesURL:[],
                };
                // 編輯方法狀態，復原其他按鈕狀態
                this.editproduct=true;
                this.detailDisplay=false;
                this.newproduct=false;
                // 帶入編輯的內容，但為避免尚未完成編輯而雙向連動，先用淺層複製
                this.productDisplay={...item};
                // console.log(this.bsNewproduct);


                
            }else{
                // 清空
                this.productDisplay={
                    imagesURL:[],
                };
                // 新增方法狀態，復原其他按鈕狀態
                this.editproduct=false;
                this.detailDisplay=false;
                this.newproduct=true;

            }
            // 顯示視窗
            this.bsNewproduct.show();
        },

        // 呈現功能按鈕
        productDetail(status, item){
            this.detailDisplay=true;
            // console.log(evt.target.dataset.detailId);
            const targetItem=item;
            this.productDisplay=targetItem;
            // console.log(this.productDisplay);
        }
    },
    //生命週期 mounted函式
    mounted(){
        // 夾帶登入時已驗證的cookie內token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        // 確認權限
        axios.post(`${this.url}/api/user/check`)
        // 成功結果接收
        .then((res)=>{
            // console.log(res.data);
            console.log("成功登入");
        //   帶入遠端data使用方法get
        // 確認有權限後進行data接收
        this.getData();
          })
        //   若驗證token 失敗則轉回index頁面
          .catch((error)=>{
            console.dir(error);
            alert(`${error.data.message}`);
            window.location.href='index.html';
          })

        // BS MODAL功能實體化
        // 針對不同目標DOM實體化
        // 新增或編輯DOM
          this.bsNewproduct=new bootstrap.Modal(document.querySelector('#productModal'));
        //   針對刪除DOM
          this.bsDeleteproduct=new bootstrap.Modal(document.querySelector('#delProductModal'));

    }
});

app.mount('#app');
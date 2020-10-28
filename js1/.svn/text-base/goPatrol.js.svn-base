var userjson =localStorage.getItem('userjsonpeople');
var UsreJson = JSON.parse(userjson);
//console.log(UsreJson);
var UserId = UsreJson[0].UserId;
var DeptId = UsreJson[0].DeptId;
//初始化放置动态内容
$(function(){
	patrolFun();//巡查内容
})
var chooseArr1 = [],chooseArr2 = [],chooseArr3 = [];
//巡查内容动态添加
var patrolContent = [{
	"grade":"C",
	"content":"在瓜果、蔬菜种植过程中喷洒“国家禁限用高毒农药”"
},{
	"grade":"C",
	"content":"在畜、禽、水产品养殖、运输或存养过程中使用“国家禁限用兽药”"
},{
	"grade":"C",
	"content":"在豆芽菜制作过程中使用“抗生素”“植物生长调节剂”或“无标签的不明物质”；"
},{
	"grade":"C",
	"content":"私屠滥宰生猪"
},{
	"grade":"C",
	"content":"利用“病死、毒死或死因不明的畜禽水产品”“无检验检疫票证的肉类”或“回收食品作原料”生产加工食品或作为餐饮服务原料的；"
},{
	"grade":"C",
	"content":"无“食品生产许可证”生产“假冒伪劣”“傍名牌”或“有毒有害”食品；"
},{
	"grade":"C",
	"content":"在食品生产加工或餐饮服务加工操作过程中添加“非食用物质”"
},{
	"grade":"C",
	"content":"贮存、销售“无标签的预包装食品”、“三无”（无厂名、无地址、无生产日期和保质期）食品；"
},{
	"grade":"C",
	"content":"贮存、销售“超过保质期、腐败变质、油脂酸败、霉变生虫、污秽不洁、混有异物、掺假掺杂”等食品或食品原料感官性状有明显异常；"
},{
	"grade":"C",
	"content":"食品标签存在标注保健、甚至治疗功能等虚假宣传；"
},{
	"grade":"C",
	"content":"开展食品、保健食品欺诈和虚假宣传活动；"
},{
	"grade":"C",
	"content":"有其它明显违法或有犯罪嫌疑行为"
},{
	"grade":"B",
	"content":"食品生产经营者无证照从事食品生产经营活动的（简称“无证照经营”或“证照不全”）、证照过期，或未将证照悬挂公示，亮明资质；"
},{
	"grade":"B",
	"content":"依据证照许可范围，超范围从事食品生产经营活动；"
},{
	"grade":"B",
	"content":"从业人员无健康证明或健康证明过期从事食品生产经营行为（简称“无证上岗行为”），或未将健康证明悬挂公示；"
},{
	"grade":"B",
	"content":"设施设备不全的。未按要求配置清洗（水池，荤素分开）、消毒（消毒柜、消毒液）、保洁（保洁柜）、防蝇、防鼠、防潮等基础设施设备或数量不匹配、不能正常运转使用。"
},{
	"grade":"B",
	"content":"基本卫生状况较差的。包括生产经营场所基本环境卫生、个人卫生状况较差。"
},{
	"grade":"B",
	"content":"有其它违法违规行为；"
},{
	"grade":"A",
	"content":"证照齐全、设备齐全、环境良好；"
}]
var forbidList1 = [{
	"title":"一、禁止生产、销售和使用的农药名单（共23种）",
	"content":"六六六、滴滴滴、毒杀芬、二溴氯丙烷、杀虫脒、二溴乙烷、除草醚、艾氏剂、狄氏剂、汞制剂、砷类、铅类、敌枯双、氟乙酰胺、甘氟、毒鼠强、氟乙酸钠、毒鼠硅（80年	代以来禁用）；甲胺磷、对硫磷、甲基对硫磷、久效磷和磷胺（2003.12.30，农业部	第322号公告）",
	"index":"1"
},{
	"title":"二、2011年新增禁止生产、销售和使用的农药名单（共10种）",
	"content":"苯线磷、地虫硫磷、甲基硫环磷、磷化钙、磷化镁、磷化锌、硫线磷、蝇毒磷、治螟磷、特丁硫磷（2011.6.15，农业部第1586号公告。自2011年10月31日起，停止生产；自2013年10月31日起，停止销售和使用。）",
	"index":"2"
},{
	"title":"三、在蔬菜果树茶叶虫草药材等作物上限制使用的农药名单（共23种）",
	"content":"禁止甲拌磷，甲基异柳磷，特丁硫磷，甲基硫环磷，治螟磷，内吸磷，克百威，涕灭威，灭线磷，硫环磷，蝇毒磷，地虫硫磷，氯唑磷，苯线磷在蔬菜、果树、茶叶、中草药材上使用（2002.5.24，农业部第199号公告）<br/>禁止甲拌磷，甲基异柳磷，特丁硫磷，甲基硫环磷，治螟磷，内吸磷，克百威，涕灭威，灭线磷，硫环磷，蝇毒磷，地虫硫磷，氯唑磷，苯线磷在蔬菜、果树、茶叶、中草药材上使用（2002.5.24，农业部第199号公告）<br/>禁止三氯杀螨醇和氰戊菊酯在茶树上使用（2002.5.24，第199号公告）。禁止丁酰肼（比久）在花生上使用（2003.4.30）<br/>禁止特丁硫磷在甘蔗上使用（2002.4.22，农业部第194号公告）<br/>除卫生用、玉米等部分旱田种子包衣剂外，禁止氟虫腈在其他方面的使用。（2009.10.1，农业部第1157号公告）<br/>禁止氧乐果、水胺硫磷在柑橘树上使用，禁止灭多威在柑橘树、苹果树、茶树、十字花科蔬菜上使用；硫线磷在柑橘树、黄瓜上使用；硫丹在苹果树、茶树上使用；溴甲烷在草莓、黄瓜上的使用（2011.6.15，农业部第1586号公告）<br/>",
	"index":"3"
}]
var forbidList2 = [
{
	"drugName":"β-兴奋剂类：克仑特罗、沙丁胺醇、西马特罗及其盐、酯及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"1"
},{
	"drugName":"性激素类：己烯雌酚及其盐、酯及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"2"
},{
	"drugName":"具有雌激素样作用的物质：玉米赤霉醇、去甲雄三烯醇酮、醋酸甲孕酮及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"3"
},{
	"drugName":"氯霉素及其盐、酯（包括：琥珀氯霉素）及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"4"
},{
	"drugName":"氨苯砜及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"5"
},{
	"drugName":"硝基呋喃类：呋喃唑酮、呋喃它酮、呋喃苯烯酸钠及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"6"
},{
	"drugName":"硝基化合物：硝基酚钠、硝呋烯腙及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"7"
},{
	"drugName":"催眠、镇静类：安眠酮及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"8"
},{
	"drugName":"林丹（丙体六六六）",
	"probidUse":"杀虫剂",
	"probidAnimal":"所有食品动物",
	"index":"9"
},{
	"drugName":"毒杀芬（氯化烯）",
	"probidUse":"杀虫剂、清塘剂",
	"probidAnimal":"所有食品动物",
	"index":"10"
},{
	"drugName":"呋喃丹（克百威）",
	"probidUse":"杀虫剂",
	"probidAnimal":"所有食品动物",
	"index":"11"
},{
	"drugName":"杀虫脒（克死螨）",
	"probidUse":"杀虫剂",
	"probidAnimal":"所有食品动物",
	"index":"12"
},{
	"drugName":"双甲脒",
	"probidUse":"杀虫剂",
	"probidAnimal":"水生食品动物",
	"index":"13"
},{
	"drugName":"酒石酸锑钾",
	"probidUse":"杀虫剂",
	"probidAnimal":"所有食品动物",
	"index":"14"
},{
	"drugName":"锥虫胂胺",
	"probidUse":"杀虫剂",
	"probidAnimal":"所有食品动物",
	"index":"15"
},{
	"drugName":"孔雀石绿",
	"probidUse":"抗菌、杀虫剂",
	"probidAnimal":"所有食品动物",
	"index":"16"
},{
	"drugName":"五氯酚酸钠",
	"probidUse":"杀螺剂",
	"probidAnimal":"所有食品动物",
	"index":"17"
},{
	"drugName":"各种汞制剂包括：氯化亚汞（甘汞）,硝酸亚汞、醋酸汞、 吡啶基醋酸汞",
	"probidUse":"杀虫剂",
	"probidAnimal":"所有食品动物",
	"index":"18"
},{
	"drugName":"性激素类：甲基睾丸酮、丙酸睾酮、苯丙酸诺龙、苯甲酸雌二醇及其盐、酯及制剂",
	"probidUse":"促生长",
	"probidAnimal":"所有食品动物",
	"index":"19"
},{
	"drugName":"催眠、镇静类：氯丙嗪、地西泮（安定） 及其盐、酯及制剂",
	"probidUse":"促生长",
	"probidAnimal":"所有食品动物",
	"index":"20"
},{
	"drugName":"硝基咪唑类：甲硝唑、地美硝唑及其盐、酯及制剂",
	"probidUse":"促生长",
	"probidAnimal":"所有食品动物",
	"index":"21"
},{
	"drugName":"肾上腺素受体激动剂：盐酸克仑特罗、沙丁胺醇、硫酸沙丁胺醇、莱克多巴胺、盐酸多巴胺、西马特罗、硫酸特布他林",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"22"
},{
	"drugName":"性激素：己烯雌酚、雌二醇、戊酸雌二醇、苯甲酸雌二醇、氯烯雌醚、炔诺醇、炔诺醚、醋酸氯地孕酮、左炔诺孕酮、炔诺酮、绒毛膜促性腺激素(绒促性素)、促卵泡生长激素(尿促性素主要含卵泡刺激FSHT和黄体生成素LH)。",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"23"
},{
	"drugName":"蛋白同化激素：碘化酷蛋白、苯丙酸诺龙及苯丙酸诺龙注射液",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"24"
},{
	"drugName":"精神药品：(盐酸)氯丙嗪、盐酸异丙嗪、安定(地西泮)、苯巴比妥、苯巴比妥钠、巴比妥、异戊巴比妥、异戊巴比妥钠、利血平、艾司唑仑、甲丙氨脂、咪达唑仑、硝西泮、奥沙西泮、匹莫林、三唑仑、唑吡旦、其他国家管制的精神药品",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"25"
},{
	"drugName":"各种抗生素滤渣",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"26"
},{
	"drugName":"硝基咪唑类：替硝唑及其盐、酯及制剂",
	"probidUse":"所有用途",
	"probidAnimal":"所有食品动物",
	"index":"27"
},{
	"drugName":"肾上腺素受体激动剂：苯乙醇胺A、班布特罗、盐酸齐帕特罗、盐酸氯丙那林、马布特罗、西布特罗、溴布特罗、酒石酸阿福特罗、富马酸福莫特罗",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"28"
},{
	"drugName":"盐酸可乐定",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"29"
},{
	"drugName":"盐酸赛庚啶",
	"probidUse":"饲料、动物饮水",
	"probidAnimal":"",
	"index":"30"
},{
	"drugName":"三聚氰胺",
	"probidUse":"禁止在饲料中人为添加",
	"probidAnimal":"",
	"index":"31"
},{
	"drugName":"洛美沙星、培氟沙星、氧氟沙星、诺氟沙星4种原料药的各种盐、酯及其各种制剂",
	"probidUse":"",
	"probidAnimal":"所有食品动物",
	"index":"32"
},{
	"drugName":"喹乙醇、氨苯胂酸、洛克沙胂等3种兽药的原料药及各种制剂",
	"probidUse":"",
	"probidAnimal":"所有食品动物",
	"index":"33"
}]
var forbidList3 = [{
	"inedibleName":"吊白块",
	"foodVarieties":"腐竹、粉丝、面粉、竹笋",
	"index":"1"
},{
	"inedibleName":"苏丹红",
	"foodVarieties":"辣椒粉、含辣椒类的食品（辣椒酱、辣味调味品）",
	"index":"2"
},{
	"inedibleName":"王金黄、块黄",
	"foodVarieties":"腐皮",
	"index":"3"
},{
	"inedibleName":"蛋白精、三聚氰胺",
	"foodVarieties":"乳及乳制品",
	"index":"4"
},{
	"inedibleName":"硼酸与硼砂",
	"foodVarieties":"腐竹、肉丸、凉粉、凉皮、面条、饺子皮",
	"index":"5"
},{
	"inedibleName":"硫氰酸钠",
	"foodVarieties":"乳及乳制品",
	"index":"6"
},{
	"inedibleName":"玫瑰红B",
	"foodVarieties":"调味品",
	"index":"7"
},{
	"inedibleName":"美术绿",
	"foodVarieties":"茶叶",
	"index":"8"
},{
	"inedibleName":"碱性嫩黄",
	"foodVarieties":"豆制品",
	"index":"9"
},{
	"inedibleName":"工业用甲醛",
	"foodVarieties":"海参、鱿鱼等干水产品、血豆腐",
	"index":"10"
},{
	"inedibleName":"工业用火碱",
	"foodVarieties":"海参、鱿鱼等干水产品、生鲜乳",
	"index":"11"
},{
	"inedibleName":"一氧化碳",
	"foodVarieties":"金枪鱼、三文鱼",
	"index":"12"
},{
	"inedibleName":"硫化钠",
	"foodVarieties":"味精",
	"index":"13"
},{
	"inedibleName":"工业硫磺",
	"foodVarieties":"白砂糖、辣椒、蜜饯、银耳、龙眼、胡萝卜、姜等",
	"index":"14"
},{
	"inedibleName":"工业染料",
	"foodVarieties":"小米、玉米粉、熟肉制品等",
	"index":"15"
},{
	"inedibleName":"罂粟壳",
	"foodVarieties":"火锅底料及小吃类",
	"index":"16"
},{
	"inedibleName":"革皮水解物",
	"foodVarieties":"乳与乳制品、含乳饮料",
	"index":"17"
},{
	"inedibleName":"溴酸钾",
	"foodVarieties":"小麦粉",
	"index":"18"
},{
	"inedibleName":"β-内酰胺酶（金玉兰酶制剂）",
	"foodVarieties":"乳与乳制品",
	"index":"19"
},{
	"inedibleName":"富马酸二甲酯",
	"foodVarieties":"糕点",
	"index":"20"
},{
	"inedibleName":"废弃食用油脂",
	"foodVarieties":"食用油脂",
	"index":"21"
},{
	"inedibleName":"工业用矿物油",
	"foodVarieties":"陈化大米",
	"index":"22"
},{
	"inedibleName":"工业明胶",
	"foodVarieties":"冰淇淋、肉皮冻等",
	"index":"23"
},{
	"inedibleName":"工业酒精",
	"foodVarieties":"勾兑假酒",
	"index":"24"
},{
	"inedibleName":"敌敌畏",
	"foodVarieties":"火腿、鱼干、咸鱼等制品",
	"index":"25"
},{
	"inedibleName":"毛发水",
	"foodVarieties":"酱油等",
	"index":"26"
},{
	"inedibleName":"工业用乙酸",
	"foodVarieties":"勾兑食醋",
	"index":"27"
},{
	"inedibleName":"肾上腺素受体激动剂类药物（盐酸克伦特罗，莱克多巴胺等）",
	"foodVarieties":"猪肉、牛羊肉及肝脏等",
	"index":"28"
},{
	"inedibleName":"硝基呋喃类药物",
	"foodVarieties":"猪肉、禽肉、动物性水产品",
	"index":"29"
},{
	"inedibleName":"玉米赤霉醇",
	"foodVarieties":"牛羊肉及肝脏、牛奶",
	"index":"30"
},{
	"inedibleName":"抗生素残渣",
	"foodVarieties":"猪肉",
	"index":"31"
},{
	"inedibleName":"镇静剂",
	"foodVarieties":"猪肉",
	"index":"32"
},{
	"inedibleName":"荧光增白物质",
	"foodVarieties":"双孢蘑菇、金针菇、白灵菇、面粉",
	"index":"33"
},{
	"inedibleName":"工业氯化镁",
	"foodVarieties":"木耳",
	"index":"34"
},{
	"inedibleName":"磷化铝",
	"foodVarieties":"木耳",
	"index":"35"
},{
	"inedibleName":"馅料原料漂白剂",
	"foodVarieties":"焙烤食品",
	"index":"36"
},{
	"inedibleName":"酸性橙Ⅱ",
	"foodVarieties":"黄鱼、鲍汁、腌卤肉制品、红壳瓜子、辣椒面和豆瓣酱",
	"index":"37"
},{
	"inedibleName":"氯霉素",
	"foodVarieties":"生食水产品、肉制品、猪肠衣、蜂蜜",
	"index":"38"
},{
	"inedibleName":"喹诺酮类",
	"foodVarieties":"麻辣烫类食品",
	"index":"39"
},{
	"inedibleName":"水玻璃",
	"foodVarieties":"面制品",
	"index":"40"
},{
	"inedibleName":"孔雀石绿",
	"foodVarieties":"鱼类",
	"index":"41"
},{
	"inedibleName":"乌洛托品",
	"foodVarieties":"腐竹、米线等",
	"index":"42"
},{
	"inedibleName":"五氯酚钠",
	"foodVarieties":"河蟹",
	"index":"43"
},{
	"inedibleName":"喹乙醇",
	"foodVarieties":"水产养殖饲料",
	"index":"44"
},{
	"inedibleName":"碱性黄",
	"foodVarieties":"大黄鱼",
	"index":"45"
},{
	"inedibleName":"磺胺二甲嘧啶",
	"foodVarieties":"叉烧肉类",
	"index":"46"
},{
	"inedibleName":"敌百虫",
	"foodVarieties":"腌制食品",
	"index":"47"
}]
var forbidList4 = [{
	"foodClassify":"渍菜（泡菜等）、葡萄酒",
	"additive":"着色剂（胭脂红、柠檬黄、诱惑红、日落黄）等",
	"index":"48"
},{
	"foodClassify":"水果冻、蛋白冻类",
	"additive":"着色剂、防腐剂、酸度调节剂（己二酸等）",
	"index":"49"
},{
	"foodClassify":"腌菜",
	"additive":"着色剂 、防腐剂、甜味剂（糖精钠、甜蜜素等）",
	"index":"50"
},{
	"foodClassify":"面点、月饼",
	"additive":"乳化剂（蔗糖脂肪酸酯等、乙酰化单甘脂肪酸酯等）、防腐剂、着色剂、甜味剂",
	"index":"51"
},{
	"foodClassify":"面条、饺子皮",
	"additive":"面粉处理剂",
	"index":"52"
},{
	"foodClassify":"糕点",
	"additive":"膨松剂（硫酸铝钾、硫酸铝铵等）、水分保持剂磷酸盐类（磷酸钙、焦磷酸二氢二钠等）、增稠剂（黄原胶、黄蜀葵胶等）、甜味剂（糖精钠、甜蜜素等）",
	"index":"53"
},{
	"foodClassify":"馒头",
	"additive":"漂白剂（硫磺）",
	"index":"54"
},{
	"foodClassify":"油条",
	"additive":"膨松剂（硫酸铝钾、硫酸铝铵）",
	"index":"55"
},{
	"foodClassify":"肉制品和卤制熟食、腌肉料和嫩肉粉类产品",
	"additive":"护色剂（硝酸盐、亚硝酸盐）",
	"index":"56"
},{
	"foodClassify":"小麦粉",
	"additive":"二氧化钛、硫酸铝钾",
	"index":"57"
},{
	"foodClassify":"小麦粉",
	"additive":"滑石粉",
	"index":"58"
},{
	"foodClassify":"臭豆腐",
	"additive":"硫酸亚铁",
	"index":"59"
},{
	"foodClassify":"乳制品（除干酪外）",
	"additive":"山梨酸",
	"index":"60"
},{
	"foodClassify":"乳制品（除干酪外）",
	"additive":"纳他霉素",
	"index":"61"
},{
	"foodClassify":"蔬菜干制品",
	"additive":"硫酸铜",
	"index":"62"
},{
	"foodClassify":"“酒类”（配制酒除外）",
	"additive":"甜蜜素",
	"index":"63"
},{
	"foodClassify":"“酒类”",
	"additive":"安塞蜜",
	"index":"64"
},{
	"foodClassify":"面制品和膨化食品",
	"additive":"硫酸铝钾、硫酸铝铵",
	"index":"65"
},{
	"foodClassify":"鲜瘦肉",
	"additive":"胭脂红",
	"index":"66"
},{
	"foodClassify":"大黄鱼、小黄鱼",
	"additive":"柠檬黄",
	"index":"67"
},{
	"foodClassify":"陈粮、米粉等",
	"additive":"焦亚硫酸钠",
	"index":"68"
},{
	"foodClassify":"烤鱼片、冷冻虾、烤虾、鱼干、鱿鱼丝、蟹肉、鱼糜等",
	"additive":"亚硫酸钠",
	"index":"69"
}]
function patrolFun(){
	var strHtml = '';
	$.each(patrolContent, function(index, item) {
		var index = index+1;
		strHtml += '<li>';
		if((index == 1)||(index ==2)||(index == 7)){
			strHtml += '<p class="appendix'+index+'">';
		}else{
			strHtml += '<p>';
		}
		strHtml += '<span class="chooseSpan" index = "'+index+'" grade = "'+item.grade+'"></span>'+index+'、'+item.content;
		if((index == 1)||(index ==2)||(index == 7)){
			strHtml += '<span style="color:#35d7ae">（点击查看附件）</span>；';
		}
		strHtml += '</p>';
		strHtml += '</li>';
	})
	$(".contentList ul").html(strHtml);
	//巡查内容复选框勾选
	$(".Patrol_content ul li").click(function(){
		$(this).find(".chooseSpan").toggleClass("hasChoose");
		gradeCount();
	})
	/*附件弹框*/
	var indexFlag;
	$("[class^='appendix']").click(function(){
		$("[class^='forbid_content']").hide();
		indexFlag = $(this).attr("class").replace(/[^0-9]/ig,"");
		$(".forbid_content"+indexFlag).show(function(){
			if(indexFlag == 1){
				forbidFun1();
				for(var i = 0;i < chooseArr1.length;i++){
					$(".forbid_content1 ul li").eq(chooseArr1[i]-1).find(".chooseSpan").addClass("hasChoose");
				}
			}else if(indexFlag == 2){
				forbidFun2();
				for(var i = 0;i < chooseArr2.length;i++){
					$(".forbid_content2 tbody tr").eq(chooseArr2[i]-1).find(".chooseSpan").addClass("hasChoose");
				}
			}else if(indexFlag == 7){
				forbidFun3();
				for(var i = 0;i < chooseArr3.length;i++){
					$(".forbid_content7 tbody tr").eq(chooseArr3[i]-1).find(".chooseSpan").addClass("hasChoose");
				}
			}
		});
		$(".content_wrapper").css("position","fixed");
		$(".proto,.proto1").addClass("hover");
	})
	//附件弹框取消
	$(".proto .return,.proto1").click(function(){
		if(indexFlag == 1){
			chooseArr1 = [];
		}else if(indexFlag == 2){
			chooseArr2 = []
		}else if(indexFlag == 7){
			chooseArr3 = []
		}
		$(".content_wrapper").css("position","static");
		$(".proto,.proto1").removeClass("hover");
		//关闭时看下可勾选
		var chooseLen = $(".forbid_content"+indexFlag).find(".chooseSpan.hasChoose").length;
		if(chooseLen >= 1){
			$(".appendix"+indexFlag).find(".chooseSpan").addClass("hasChoose");
		}else{
			$(".appendix"+indexFlag).find(".chooseSpan").removeClass("hasChoose");
		}
		gradeCount();
		///////关闭弹框再次进来时，把之前选择的带过来
		var chooseArr = $(".forbid_content"+indexFlag).find(".chooseSpan.hasChoose");
		$.each($(chooseArr), function(index, item) {
			if(indexFlag == 1){
				chooseArr1.push($(item).attr("index"));
			}else if(indexFlag == 2){
				chooseArr2.push($(item).attr("index"));
			}else if(indexFlag == 7){
				chooseArr3.push($(item).attr("index"));
			}
		})
		/*console.log(chooseArr1);
		console.log(chooseArr2);
		console.log(chooseArr3);*/
	})
}
//附件1
function forbidFun1(){
	var strHtml = '';
	$.each(forbidList1, function(index, item) {
		strHtml += '<li>';
		strHtml += '<p><span class="chooseSpan" index = "'+item.index+'"></span><span class="bold">'+item.title+'</span></p>';
		strHtml += '<p class="light">'+item.content+'</p>';
		strHtml += '</li>';
	})
	$(".forbid_content1 ul").html(strHtml);
	//巡查内容复选框勾选
	$(".forbid_content1 li").click(function(){
		$(this).find(".chooseSpan").toggleClass("hasChoose");
	})
}
//附件2
function forbidFun2(){
	var strHtml = '';
	$.each(forbidList2, function(index, item) {
		strHtml += '<tr>';
		strHtml += '<td><span class="chooseSpan" index = "'+item.index+'"></span></td>';
		strHtml += '<td>'+item.drugName+'</td>';
		strHtml += '<td>'+item.probidUse+'</td>';
		strHtml += '<td>'+item.probidAnimal+'</td>';
		strHtml += '</tr>';
	})
	$(".forbid_content2 tbody").html(strHtml);
	//复选框勾选
	$(".forbid_content2 table tr").click(function(){
		$(this).find(".chooseSpan").toggleClass("hasChoose");
	})
}
//附件3
function forbidFun3(){
	var strHtml1 = '';
	$.each(forbidList3, function(index, item) {
		strHtml1 += '<tr>';
		strHtml1 += '<td><span class="chooseSpan" index = "'+item.index+'"></span></td>';
		strHtml1 += '<td>'+item.inedibleName+'</td>';
		strHtml1 += '<td>'+item.foodVarieties+'</td>';
		strHtml1 += '</tr>';
	})
	$("#addFoodList1").html(strHtml1);
	var strHtml2 = '';
	$.each(forbidList4, function(index, item) {
		strHtml2 += '<tr>';
		strHtml2 += '<td><span class="chooseSpan" index = "'+item.index+'"></span></td>';
		strHtml2 += '<td>'+item.foodClassify+'</td>';
		strHtml2 += '<td>'+item.additive+'</td>';
		strHtml2 += '</tr>';
	})
	$("#addFoodList2").html(strHtml2);
	//复选框勾选
	$(".forbid_content7 table tr").click(function(){
		$(this).find(".chooseSpan").toggleClass("hasChoose");
	})
}
//商户属性和商户类型选择项勾选
$(".radioDiv .yuannoxuan").click(function(){
	$(this).parents(".radioDiv").find(".yuannoxuan").removeClass("yuanxuan");
	$(this).addClass("yuanxuan").siblings();
	if($(this).hasClass("morelist")){
		$(this).parents("li").find(".tips").show();
	}else{
		if($(this).attr("coldFish") != 1){
			$(this).parents("li").find(".tips").hide();
		}
	}
})
//计算评分
function gradeCount(){
	var arrList = $(".contentList ul li").find(".chooseSpan.hasChoose");
	var gradeArr = [];
	$.each($(arrList), function(index, item) {
		gradeArr.push($(item).attr("grade"));
	})
	if(gradeArr.indexOf("C") != -1){
		$(".judgeResult span").html("C");
	}else if(gradeArr.indexOf("B") != -1){
		$(".judgeResult span").html("B");
	}else if(gradeArr.indexOf("A") != -1){
		$(".judgeResult span").html("A");
	}else{
		$(".judgeResult span").html("");
	}
}
//搜索
var busInfo;
$(".searchB").click(function(){
	$(".searchContent ul").show().html("");
	var Ctext = $("#searchBtn").val();
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/GetMyCheckCtextList",
		timeout : 60000, //超时时间设置，单位毫秒
		data: {
			Ctext: Ctext,
			UserId: UserId, 
			DeptId:DeptId,
		},
        type: "GET",
		contentType: 'application/json;charset=utf-8',
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) {
			var jsons = JSON.parse(data);
			//console.log(jsons);
			if(jsons.data != ""){	
				//$(".content_bottom").css("position","fixed");
				$(".hgt").show();
				$(".searchTop").addClass("whenSearch");
				var strHtml = '';
				$.each(jsons.data, function(index, item) {
					strHtml += '<li>'+item.Ctext+'</li>';
				})
				$(".searchContent ul").html(strHtml);
				$(".searchContent ul").delegate("li","click",function(){
					var index = $(this).index();
					busInfo = jsons.data[index];
					$("#searchBtn").val($(this).html());
					if($("#searchBtn").val() == "暂无数据"){
						$("#searchBtn").val("");
					}
					$(".searchContent ul,.hgt").hide();
					$(".searchTop").removeClass("whenSearch");
					$(".classifySelect").hide();
					busInfoList();//放置商户信息
				})
			}else{
				var strHtml = '<p>暂无数据</p>';
				$(".searchContent ul").show().html(strHtml);
				$(".searchTop").removeClass("whenSearch");
				$(".hgt").hide();
				//搜索框聚焦时搜索内容去掉
				$("#searchBtn").keyup(function(){
					$(".searchContent ul").hide();
					
				})
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}
		}
	})
});
/*滑动的时候下拉框的样式发生改变*/
var contentBTM = document.getElementById("content_bottom");
contentBTM.addEventListener("touchmove", e => {
 	//e.preventDefault()
 	$(".searchTop").removeClass("whenSearch");
	$(".hgt").hide();
})
/*var contentBody = document.getElementById("contentBody");
contentBody.addEventListener("touchmove", e => {
 	//e.preventDefault()
	$(".classifySelect").hide();
})*/
//放置商户信息
function busInfoList(){
	//console.log(busInfo);
	$(".disappeara").show();
	$("#address").val(busInfo.HAddress);
	$("#address").attr("KeyId",busInfo.KeyId);
	$("#legalPerson").val(busInfo.LegalPerson);
	$("#telphone").val(busInfo.HTel);
	$("#employee").val(busInfo.PPCount);
	$("#healthCard").val(busInfo.HealthCredCount);
	$("#CheckGrade").val(busInfo.CheckGrade);
	$("#LastUser").val(busInfo.LastUser);
	$(".arrow").html(busClassF(busInfo.ClassF)).css("background","none").removeAttr("onclick").attr("indexClassify",busInfo.ClassF);//类型，和tableSort不一样
	$("[class^='inspect_content']").hide();
	$(".inspect_content"+busInfo.ClassF).show();
	$(".busSign").show();
	if(busInfo.CheckTime!=""){
		$("#CheckTime").val(allTimeChange1(busInfo.CheckTime));
	}else{
		$("#CheckTime").val(busInfo.CheckTime);
	}
	$('html,body').animate({scrollTop: '0px'}, 10);
}
///////////////////////定位
var map, geolocation;
map = new AMap.Map('addressPosition');
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
    //AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
});
var myplace = ''; //我的位置
var mycity = ''; //我所在的城市
//解析定位结果
function onComplete(data) {
    var str = ['定位成功'];
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米');
    } //如为IP精确定位结果则没有精度信息
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    //document.getElementById('tip').innerHTML = str.join('<br>');
    // parent.loca(data);
    myplace = data.formattedAddress; //我的位置
    mycity = data.addressComponent.city; //我所在的城市
    //console.log('str',data.position.getLng(),data.position.getLat());
    $(".addrP").css("display","block");
    $(".addrContent").html(data.formattedAddress);
    //console.log("我所在的地点为 " + data.formattedAddress);
    //console.log("我所在的城市为 " + data.addressComponent.city);
}

function getSomeOfMyVal() {
    return myplace + "+" + mycity;
}
//解析定位错误信息
/*function onError(data) {
    document.getElementById('tip').innerHTML = '定位失败';
}*/

function getGeolocation() {
    geolocation.getCurrentPosition();
}

/*商户类别*/
function selectClassify(){
	$(".classifySelect").show();//选择商户类别
}
$(".classifySelect ul li").click(function(){
	$(".classifySelect").hide();
	$(".arrow").html($(this).html()).attr("indexclassify",$(this).attr("value"));
	var index = $(this).attr("value");
	$("[class^='inspect_content']").hide();
	$(".inspect_content"+index).show();//对应的表
	if(index != ""){
		$(".busSign").show();//签名
	}else{
		$(".busSign").hide();//签名
	}
})
$(".inspect_content3 ul.tips li").click(function(){
	$(this).find(".chooseSpan").toggleClass("hasChoose");
})

//提交（1:1,2,5;2:4,9;3;9;7:2,5|3,5;9;11;12）//大类用;附件小类用:
$(".submitBtn").click(function(){
	var indexClassify = $(".arrow").attr("indexClassify");//选的是哪一类
	var Ctext = $("#searchBtn").val();//商家名称
	var TelePhone = $("#telphone").val();//商家手机号
	if(Ctext == ""){
		alert("请填写商家名称");
		return false;
	}
	if ((TelePhone != '' && isPhoneAvailable(TelePhone) == false) && (TelePhone != '' && istell(TelePhone) == false)) {
		alert("请输入正确的手机号码！");
		return;
	}
	//*******如果选择小摊贩，验证填的信息*******//IdentityCodeValid
	if(indexClassify == 4){
		var PeddlerId = $("#PeddlerId").val();//身份证号
		if ((PeddlerId != '' && IdentityCodeValid(PeddlerId) == false)) {
			return;
		}
		var PeddlerTel = $("#PeddlerTel").val();//联系方式
		if ((PeddlerTel != '' && isPhoneAvailable(PeddlerTel) == false) && (PeddlerTel != '' && istell(PeddlerTel) == false)) {
			alert("请输入正确的手机号！");
			return;
		}
	}
	//商户属性
	var radioArr = [];
	$(".busNature .radioDiv").each(function(index,arr){
		if($(arr).find(".yuanxuan").attr("flag") == undefined){
			radioArr.push("2");
		}else{
			radioArr.push($(arr).find(".yuanxuan").attr("flag"));
		}
	})
	var Uattribute = radioArr.join(",");
	//console.log(Uattribute);
	//获取巡查内容选择了哪几项
	var arrList = [];
	var paramString = '';
	if(chooseArr1.length>=1){
		paramString += "1:"+chooseArr1.join(",")+";";
	}
	if(chooseArr2.length>=1){
		paramString += "2:"+chooseArr2.join(",")+";";
	}
	if(chooseArr3.length>=1){
		paramString += "7:"+chooseArr3.join(",")+";";
	}
	var chooseList = $(".contentList ul li").find(".chooseSpan.hasChoose");
	$.each($(chooseList), function(index, item) {
		var index = $(item).attr("index");
		if((index!=1)&&(index!=2)&&(index!=7)){
			arrList.push($(item).attr("index"));
		}
	})
	if(arrList.length>=1){
		paramString += arrList.join(";");
	}
	//console.log(paramString);	
	if(radioArr.length<4){
		//alert("请选择商户属性")
		//return false
	}
	//图片
	var ContentPhoto = [];
	$(".pic-sc figure").each(function(index,arr){
		if($(arr).is(':visible')){
			ContentPhoto.push($(arr).find("img").attr("src").split(",")[1])
		}
	})
	var dataParam = {
		IsUpdate: "0",
		ID: "", 
		UserId:UserId,
		UserKeyId:DeptId,
		CheckContent:$("#CheckContent").val(),
		ContentPhoto:ContentPhoto,
		ContentVideoPath: "",
		UploadSite:$(".addrContent").html(),
		Ctext:Ctext,
		KeyId:$("#address").attr("KeyId"),
		Score:"",
		CheckGrade:$(".judgeResult span").html(),
		LegalPerson:$("#legalPerson").val(),
		Tel:TelePhone,
		Addr:$("#address").val(),
		PPCount:$("#employee").val(),
		HealthCredCount:$("#healthCard").val(),
		Uattribute:Uattribute,
		LegalDocumentsNum:paramString
	};
	/***************选检查表时****************/
	var indexClassify = $(".arrow").attr("indexClassify");
	var urlParam;//四张表对应不同的方法
	if(indexClassify == "0"){//没有选检查表时
		dataParam.TableSort = "0";
		urlParam = "InsertOrUpdateNetInspectNoTableRecord";
	}else if(indexClassify == "3"){//餐饮经营单位
		urlParam = "InsertOrUpdateNetInspectRecord";	
		dataParam.TableSort = "1";
		var checkArr = [];
		$(".inspect_content3 li>div.radioDiv").each(function(index,arr){
			if($(arr).find(".yuanxuan").attr("flag") == undefined){
				checkArr.push("0");
			}else{
				checkArr.push($(arr).find(".yuanxuan").attr("flag"));
			}
		})
		var strEup = "";//存放小类
		if($(".equipment3 .tips").is(':visible')){//餐具是否有清洗消毒设施
			var strEupList = $(".equipment3 .tips li").find(".chooseSpan.hasChoose");
			if(strEupList.length>0){
				$.each($(strEupList), function(index, item) {
					strEup += $(item).attr("index")+"," 
				})
				strEup=strEup.substring(0,strEup.length-1)
				checkArr[2] = checkArr[2]+":"+strEup;
			}
		}
		if($(".dishLi .tips").is(':visible')){//是否制作凉菜
			var flag = $(".dishLi .tips").find(".yuanxuan").attr("flag");
			if(flag != undefined){
				checkArr[3] = checkArr[3]+":"+flag;
			}
		}
		checkArr = checkArr.join(";")
		//console.log(checkArr);
		dataParam.CheckItemsAnswer = checkArr;
	}else if(indexClassify == "2"){//经销单位
		urlParam = "InsertOrUpdateNetInspectShoppingRecord";
		dataParam.TableSort = "2";
		var checkArr = [];
		$(".inspect_content2 li .radioDiv").each(function(index,arr){
			if($(arr).find(".yuanxuan").attr("flag") == undefined){
				checkArr.push("0");
			}else{
				checkArr.push($(arr).find(".yuanxuan").attr("flag"));
			}
		})
		checkArr = checkArr.join(";");
		dataParam.CheckItemsAnswer = checkArr;
	}else if(indexClassify == "1"){//小作坊
		urlParam = "InsertOrUpdateNetInspectWorkShopRecord";
		dataParam.TableSort = "3";
		var checkArr = [];
		$(".inspect_content1 li .radioDiv").each(function(index,arr){
			if($(arr).find(".yuanxuan").attr("flag") == undefined){
				checkArr.push("0");
			}else{
				checkArr.push($(arr).find(".yuanxuan").attr("flag"));
			}
		})
		checkArr = checkArr.join(";");
		dataParam.CheckItemsAnswer = checkArr;
	}else if(indexClassify == "4"){//小摊贩
		urlParam = "InsertOrUpdateNetInspectPeddlerRecord";
		dataParam.TableSort = "4";
		var checkArr = $(".inspect_content4 li .radioDiv").find(".yuanxuan").attr("flag");
		dataParam.CheckItemsAnswer = checkArr;
		if(checkArr == undefined){
			checkArr = "0";
			dataParam.ProcurementSource = "";
		}else{
			dataParam.ProcurementSource = $("#ProcurementSource").val();//原材料采购来源
		}
		dataParam.PeddlerName = $("#PeddlerName").val();//摊主姓名
		dataParam.PeddlerId = $("#PeddlerId").val();//摊主身份证号
		dataParam.PeddlerTel = $("#PeddlerTel").val();//摊主联系方式
		dataParam.PeddlerAddress = $("#PeddlerAddress").val();//PeddlerAddress
	}
	if(indexClassify != "0"){
		dataParam.OtherQuestion = $(".inspect_content"+indexClassify).find(".Opinion").val();
		dataParam.Opinion = $(".inspect_content"+indexClassify).find(".Opinion").val();
		////////////判断是否有签名
		if($(".addSign img").hasClass("hover")){
			var signArr = [];
			signArr.push($(".addSign img").attr("src").split(",")[1]);
			dataParam.SignPhoto = signArr;
		}else{
			dataParam.SignPhoto = "";
		}
	}
	//console.log(dataParam);
	dataParam = JSON.stringify(dataParam);
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/"+urlParam,
		timeout : 30000, //超时时间设置，单位毫秒
		data: dataParam,
        type: "POST",
		contentType: 'application/json;charset=utf-8',
		cache:false,
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) { 
			var jsons = JSON.parse(data);
			//console.log(jsons);
			if(jsons.msg){
				alert("发布成功");
				window.location.href = "Checklist.html";
			}else{
				alert("发布失败");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}
		}
	})
})
function busClassF(ClassF){
	var busName = "";
	if(ClassF == 1){
		busName = "食品加工小作坊";
	}else if(ClassF == 2){
		busName = "销售单位";
	}else if(ClassF == 3){
		busName = "餐饮服务单位";
	}else if(ClassF == 4){
		busName = "小摊贩";
	}
	return busName;
}
///////签名弹框
function clickSign(){
	//$(".content_wrapper").css("position","fixed");
	$(".signBox,.signBox1").addClass("hover");
	$("#signature button").hide();
	$('#signature').jSignature({ lineWidth: 2, width: "100%", height: "65vh" });
}
//关闭弹框
$(".signBox1").click(function(){
	$(".content_wrapper").css("position","static");
	$(".signBox,.signBox1").removeClass("hover");
})
$(".signBtn").click(function(){
	var data = $('#signature').jSignature('getData', 'default')
	$(".content_wrapper").css("position","static");
	$(".signBox,.signBox1").removeClass("hover");
	//////////////把生成的签名放到页面中
	$(".addSign span").hide();
	$(".addSign img").addClass("hover").attr("src",data);
})
//////重置	
$(".signBox span").click(function(){
	$('#signature').jSignature("reset") // 清除画布并在其上重新装饰。
})
/////点击重新签名
$("#restSign").click(function(){
	$('#signature').jSignature("reset") // 清除画布并在其上重新装饰。
	$(".addSign span").show();
	$(".addSign img").removeClass("hover").attr("src","");
})

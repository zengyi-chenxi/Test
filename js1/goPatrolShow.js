var ID = GetQueryString("ID");//表id
var TableSort = GetQueryString("TableSort"); //检查表类型：1：餐饮服务单位；2：经销商单位；3：小作坊 4 小摊贩
var IsNewRecord = GetQueryString("IsNewRecord");//0是旧表,1是新表
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
	"title":"禁止生产、销售和使用的农药名单（共23种）",
	"content":"六六六、滴滴滴、毒杀芬、二溴氯丙烷、杀虫脒、二溴乙烷、除草醚、艾氏剂、狄氏剂、汞制剂、砷类、铅类、敌枯双、氟乙酰胺、甘氟、毒鼠强、氟乙酸钠、毒鼠硅（80年	代以来禁用）；甲胺磷、对硫磷、甲基对硫磷、久效磷和磷胺（2003.12.30，农业部	第322号公告）",
	"index":1
},{
	"title":"2011年新增禁止生产、销售和使用的农药名单（共10种）",
	"content":"苯线磷、地虫硫磷、甲基硫环磷、磷化钙、磷化镁、磷化锌、硫线磷、蝇毒磷、治螟磷、特丁硫磷（2011.6.15，农业部第1586号公告。自2011年10月31日起，停止生产；自2013年10月31日起，停止销售和使用。）",
	"index":2
},{
	"title":"在蔬菜果树茶叶虫草药材等作物上限制使用的农药名单（共23种）",
	"content":"禁止甲拌磷，甲基异柳磷，特丁硫磷，甲基硫环磷，治螟磷，内吸磷，克百威，涕灭威，灭线磷，硫环磷，蝇毒磷，地虫硫磷，氯唑磷，苯线磷在蔬菜、果树、茶叶、中草药材上使用（2002.5.24，农业部第199号公告）<br/>禁止甲拌磷，甲基异柳磷，特丁硫磷，甲基硫环磷，治螟磷，内吸磷，克百威，涕灭威，灭线磷，硫环磷，蝇毒磷，地虫硫磷，氯唑磷，苯线磷在蔬菜、果树、茶叶、中草药材上使用（2002.5.24，农业部第199号公告）<br/>禁止三氯杀螨醇和氰戊菊酯在茶树上使用（2002.5.24，第199号公告）。禁止丁酰肼（比久）在花生上使用（2003.4.30）<br/>禁止特丁硫磷在甘蔗上使用（2002.4.22，农业部第194号公告）<br/>除卫生用、玉米等部分旱田种子包衣剂外，禁止氟虫腈在其他方面的使用。（2009.10.1，农业部第1157号公告）<br/>禁止氧乐果、水胺硫磷在柑橘树上使用，禁止灭多威在柑橘树、苹果树、茶树、十字花科蔬菜上使用；硫线磷在柑橘树、黄瓜上使用；硫丹在苹果树、茶树上使用；溴甲烷在草莓、黄瓜上的使用（2011.6.15，农业部第1586号公告）<br/>",
	"index":3
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
//商户属性
var busArrNature = [{
	"content":"本巡查单位是否属于“四小”单位（小作坊、小餐饮、小摊贩、小食品店）、无证照或证照不全单位、集贸市场及经营户等。",
	"index":"1"
},{
	"content":"本巡查单位是否属于重点区域（农村、城乡结合部、校园及周边、食品批发集散地及周边、车站码头和城市综合体等区域）。",
	"index":"2"
},{
	"content":"本巡查单位是否属于重点对象（业态，食品生产经营者（含“前店后坊”、熟食制作和销售场所、小饭桌和看护点、私人会所“一桌餐”）和闲置用房（无证照生产经营）、办公大厦（“会销”活动）、冷库等可能用于食品生产经营活动的场所）。",
	"index":"3"
},{
	"content":"否将本单位列入日常巡查清单。",
	"index":"4"
}]
//初始化放置动态内容
$(function(){
	natureFun();//商户属性
	patrolFun();//巡查内容
	basicInfo();//放置初始化内容
	$(".busNature .contentMarginTop li").hide();
	forbidFun();
})
/////三个附件内容先放进去
function forbidFun(){
	//附件一
	var strHtml1 = '';
	$.each(forbidList1, function(index, item) {
		strHtml1 += '<li>';
		strHtml1 += '<p><span class="chooseSpan"></span><span class="bold"><span class="indexFlag">'+item.index+'、</span>'+item.title+'</span></p>';
		strHtml1 += '<p class="light">'+item.content+'</p>';
		strHtml1 += '</li>';
	})
	$(".forbid_content1 ul").html(strHtml1);
	$(".forbid_content1 ul li").hide();
	//附件二
	var strHtml2 = '';
	$.each(forbidList2, function(index, item) {
		strHtml2 += '<tr>';
		strHtml2 += '<td>'+item.drugName+'</td>';
		strHtml2 += '<td>'+item.probidUse+'</td>';
		strHtml2 += '<td>'+item.probidAnimal+'</td>';
		strHtml2 += '</tr>';
	})
	$(".forbid_content2 tbody").html(strHtml2);
	$(".forbid_content2 tbody tr").hide();
	//附件七
	var strHtml3 = '';
	$.each(forbidList3, function(index, item) {
		strHtml3 += '<tr>';
		strHtml3 += '<td>'+item.inedibleName+'</td>';
		strHtml3 += '<td>'+item.foodVarieties+'</td>';
		strHtml3 += '</tr>';
	})
	$("#addFoodList1").html(strHtml3);
	$("#addFoodList1 tr").hide();
	var strHtml4 = '';
	$.each(forbidList4, function(index, item) {
		strHtml4 += '<tr>';
		strHtml4 += '<td>'+item.foodClassify+'</td>';
		strHtml4 += '<td>'+item.additive+'</td>';
		strHtml4 += '</tr>';
	})
	$("#addFoodList2").html(strHtml4);
	$("#addFoodList2 tr").hide();
}
/////////初始化放置数据	
function basicInfo(){
	if(TableSort == "0"){
		TableSort = "";
	}
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/GetNetInspectRecordInfoByID",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {
			ID: ID,
			TableSort: TableSort, 
		},
        type: "GET",
		contentType: 'application/json;charset=utf-8',
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) { 
			var datas=JSON.parse(data).data;
			//console.log(datas[0]);
			if(datas[0] != ""){
				//商家名称
				$("#searchBtn").val(datas[0].InspectedCtext);
				//巡查内容
				var LegalDocumentsNum = datas[0].LegalDocumentsNum;
				//var LegalDocumentsNum = '1:1,2,3;2:1,2,3;3;4;7:1,2,3,48,49,50;18,19'
				if(LegalDocumentsNum == ""){
					$(".Patrol_content").hide();
				}else{
					$(".Patrol_content").show();
					var bigClassifyArr;
					if((LegalDocumentsNum.indexOf(";") == -1)&&(LegalDocumentsNum.indexOf(":") == -1)){//只有一条数据
						$(".contentList ul li").eq(LegalDocumentsNum-1).show();
					}else{//不只选择一个
						bigClassifyArr = LegalDocumentsNum.split(";");
						//console.log(bigClassifyArr);
						bigClassifyArr.forEach((item, index, array) => {
							if(item.indexOf(":") == -1){
								$(".contentList ul li").eq(item-1).show();
							}else{
								//不是附件
								if(item.split(":")[0] == 1){
									$(".contentList ul li").eq(0).show();
									var arrList1 = item.split(":")[1].split(",");
									arrList1.forEach((item, index, array) => {
										$(".forbid_content1").show();
										$(".forbid_content1 ul li").eq(Number(item)-1).show().find(".indexFlag").html(index+1+"、");
									})
								}else if(item.split(":")[0] == 2){
									$(".contentList ul li").eq(1).show();
									var arrList2 = item.split(":")[1].split(",");
									arrList2.forEach((item, index, array) => {
										$(".forbid_content2").show();
										$(".forbid_content2 tbody tr").eq(Number(item)-1).show();
									})
								}else if(item.split(":")[0] == 7){
									$(".forbid_content3").show();
									$(".contentList ul li").eq(6).show();
									var arrList3 = item.split(":")[1].split(",");
									arrList3.forEach((item, index, array) => {
										if(item < 48){
											$(".disappeara1").show();
											$("#addFoodList1 tr").eq(Number(item)-1).show();
										}else{
											$(".disappeara").show();
											$("#addFoodList2 tr").eq(Number(item)-48).show();
										}
										
									})
								}
							}
						})
					}
					$(".judgeResult span").html(datas[0].CheckGrade);
				}
				//商户属性
				var Uattribute = datas[0].Uattribute;
				if((Uattribute == "")||((Uattribute.indexOf("1")==-1)&&(Uattribute.indexOf("0")==-1))){
					$(".busNature").hide();
				}else{
					$(".busNature").show();
					var Uattribute = datas[0].Uattribute.split(",");
					Uattribute.forEach((item, index, array) => {
						if(item != 2){
							$(".busNature ul li").eq(index).show();
							$(".radioDiv").eq(index).find("span[flag='"+item+"']").addClass("yuanxuan");
						}
					});
				}
				/***********商户类别**********/
				if(IsNewRecord == 0){//旧表
					$(".busClassify").hide();
				}else if(IsNewRecord == 1){//新表
					$(".busClassify").show();
					$(".arrow").html(busClassF(TableSort));
					$("#inspect_content"+TableSort).show();
					if(TableSort == 1){//餐饮
					var CheckItemsAnswerList = datas[0].CheckItemsAnswer.split(";");//选项答案
						//console.log(CheckItemsAnswerList);
						CheckItemsAnswerList.forEach((item, index, array) => {
							if(item.indexOf(":") == -1){//1：餐饮服务单位
								$(".inspect_content3 li>div.radioDiv").eq(index).find("span[flag='"+item+"']").addClass("yuanxuan");
							}else if(index == 2){
								$(".equipment3 .tips").show();
								$(".equipment3>.radioDiv").find("span[flag='"+item.split(":")[0]+"']").addClass("yuanxuan");
								var arrList1 = item.split(":")[1].split(",");
								for(var i = 0;i < arrList1.length;i++){
									$(".equipment3 .tips li").eq(arrList1[i]-1).find(".chooseSpan").addClass("hasChoose");
								}
							}else if(index == 3){
								$(".dishLi .tips").show();
								$(".dishLi>.radioDiv").find("span[flag='"+item.split(":")[0]+"']").addClass("yuanxuan");
								$(".dishLi .tips .radioDiv").find("span[flag='"+item.split(":")[1]+"']").addClass("yuanxuan");
							}
						})
					}else if(TableSort == 2){//2：经销商单位
						var CheckItemsAnswerList = datas[0].CheckItemsAnswer.split(";");//选项答案
						CheckItemsAnswerList.forEach((item, index, array) => {
							$(".inspect_content2 .radioDiv").eq(index).find("span[flag='"+item+"']").addClass("yuanxuan");
						});
					}else if(TableSort == 3){//3：食品加工小作坊
						var CheckItemsAnswerList = datas[0].CheckItemsAnswer.split(";");//选项答案
						CheckItemsAnswerList.forEach((item, index, array) => {
							$(".inspect_content1 .radioDiv").eq(index).find("span[flag='"+item+"']").addClass("yuanxuan");
						});
					}else if(TableSort == 4){//4：小摊贩
						$(".inspect_content4 .radioDiv").find("span[flag='"+datas[0].CheckItemsAnswer+"']").addClass("yuanxuan");
						$("#ProcurementSource").val(datas[0].ProcurementSource);//原材料采购来源
						$("#PeddlerName").val(datas[0].PeddlerName);//摊主姓名
						$("#PeddlerId").val(datas[0].PeddlerId);//摊主身份证号
						$("#PeddlerTel").val(datas[0].PeddlerTel);//摊主联系方式
						$("#PeddlerAddress").val(datas[0].PeddlerAddress);//PeddlerAddress
					}
					$(".Opinion").html(datas[0].Opinion);//意见
					var SignPhotoPath = data[0].SignPhotoPath;//签名
					 //商家签名
				    if(datas[0].SignPhotoPath != ""){
				    	var strSignHtml = "";
				    	//var src= "http://49.234.203.131:8009/Picture/%E7%BD%91%E6%A0%BC%E8%A7%86%E5%B7%A1/H56109/20200826111310131052.jpg";
				    	strSignHtml +="<div class='my-gallery' data-pswp-uid='2'>";           	
	                   	strSignHtml +="<figure><div><a href='"+datas[0].SignPhotoPath+"' data-size='1600x1600'><img src='"+datas[0].SignPhotoPath+"'></a></div></figure>";
	                    strSignHtml +="</div>";
	                    $(".addSign").html(strSignHtml);
	                    $(".addSign img").addClass("hover");
				    	initPhotoSwipeFromDOM('.my-gallery');//初始化图片放大
				    }else{
				    	 $(".addSign").html("");
				    	 $(".addSign img").removeClass("hover");
				    }
				}
				//商户信息
				$("#address").val(datas[0].Addr);
				$("#legalPerson").val(datas[0].LegalPerson);
				$("#telphone").val(datas[0].Tel);
				$("#employee").val(datas[0].PPCount);
				$("#healthCard").val(datas[0].HealthCredCount);
				$(".addrContent").html(datas[0].UploadSite);//???????
				//图片
				//console.log(datas[0].ContentPhotoPath);
				var phoneList = datas[0].ContentPhotoPath;
				//var phoneList = 'http://49.234.203.131:8009/Picture/%E7%BD%91%E6%A0%BC%E8%A7%86%E5%B7%A1/H56109/202008121059325932195.jpg,http://49.234.203.131:8009/Picture/%E7%BD%91%E6%A0%BC%E8%A7%86%E5%B7%A1/H56109/202008121059325932134.jpg,http://49.234.203.131:8009/Picture/%E7%BD%91%E6%A0%BC%E8%A7%86%E5%B7%A1/H56109/202008121059325932195.jpg'
				var str = "";
				if(phoneList !=''){
                	str +="<div class='my-gallery' data-pswp-uid='1'>";           	
                	var arrs = phoneList.split(',');
                    for(var i=0;i<arrs.length;i++){
                    	str +="<figure><div><a href='"+arrs[i]+"' data-size='1600x1600'><img src='"+arrs[i]+"'></a></div></figure>";
                    }
                    str +="</div>";
                    $(".Checklistli_middle").html(str);
					initPhotoSwipeFromDOM('.my-gallery');//初始化图片放大
                }else{
                	$(".photoScene").hide();
                }
				////////////////////////////////////////
				if(TableSort == 0){//如果tableSort为0的话，其他三个小表不存在
					$(".checkdetaillist").hide();
				}else{
					if(IsNewRecord == 0){//旧表
						$(".remarksDiv").show();
						$('.OtherQuestion').html(datas[0].OtherQuestion);//存在其他相关问题
				        $('.PPCount').html(datas[0].PPCount);//从业人员数
					    $('.HealthCredCount').html(datas[0].HealthCredCount);//持健康证明人数
					    $('#tablescore').html(datas[0].Score.split('.')[0]);//绑定等级分数
					    if(Number(datas[0].Score.split('.')[0])>= 90){
					      	$('#tablegrade').html('A');
					    }else if(Number(datas[0].Score.split('.')[0]) <= 60){
					      	$('#tablegrade').html('C');
					    }else{
					      	$('#tablegrade').html('B');
					    }
					    $('#Opinion').val(datas[0].Opinion);//整改意见
					    //商家签名
					    if(datas[0].SignPhotoPath != ""){
					    	$(".hide").show();
					    	var strSignHtml = "";
					    	strSignHtml +="<div class='my-gallery' data-pswp-uid='2'>";           	
		                   	strSignHtml +="<figure><div><a href='"+datas[0].SignPhotoPath+"' data-size='1600x1600'><img src='"+datas[0].SignPhotoPath+"'></a></div></figure>";
		                    strSignHtml +="</div>";
		                    $("#SignPhotoPath").html(strSignHtml);
					    	initPhotoSwipeFromDOM('.my-gallery');//初始化图片放大
					    }else{
					    	 $("#SignPhotoPath").html("");
					    	 $(".hide").hide();
					    }
					}else{
						$(".remarksDiv").hide();
					}
				}
				if(IsNewRecord == 0){//旧表
					if(TableSort == 1){//表一
			          	$('#tableone').css('display','block');
			          	$('#tableonePermitDate').html(datas[0].PermitDate);
			          	$('#tableonePermitNo').html(datas[0].PermitNo);
						$('#tableonePermitType').html(datas[0].PermitType);
						//var CheckItemsAnswer = "1,1,2,1,2,1,2,1,1,1,2,1,2,1,2,1,2,1,2";
						//var inpt = CheckItemsAnswer.split(',');//所有选项数据的绑定
			          	var inpt = datas[0].CheckItemsAnswer.split(',');//所有选项数据的绑定
				        inpt.forEach((item, index, array) => {
				        	if(index == 0){
				        		$("#tableone .checkradio").eq(index).find("span[flag='"+item+"']").addClass("radioxuan");
				        	}else if(index == 18){
				        		$("#tableone .checkradio").eq(1).find("span").removeClass("radioxuan");
				        		$("#tableone .checkradio").eq(1).find("span[flag='"+item+"']").addClass("radioxuan");
				        	}else{
				        		$("#tableone .checkradio").eq(index+1).find("span[flag='"+item+"']").addClass("radioxuan");
				        	}
					    });
			        }else if(TableSort == 2){//表二
			          	$('#tabletwo').css('display','block');
			          	$('#AllSortCount').html(datas[0].AllSortCount);//巡查食品
					    $('#PreFoodSortCount').html(datas[0].PreFoodSortCount);//预包装食品
					    $('#BulkFoodSortCount').html(datas[0].BulkFoodSortCount);//散装食品
					    $('#KHFSortCount').html(datas[0].KHFSortCount);//保健食品
					    $('#TCCount').html(datas[0].TCCount);//农药
					    $('#GMPCount').html(datas[0].GMPCount);//兽药
					    $('#FodderCount').html(datas[0].FodderCount);//饲料
			          	var inptone = datas[0].ShoppiongSort.split(',');//经营品种绑定
						for(var i=0;i<inptone.length;i++){
						    if( inptone[i] ==1 ){
				                    var xradioone = document.getElementsByName("ShoppiongSort"+i);
					                for(var j=0;j<xradioone.length;j++){
					                    if(xradioone[j].getAttribute('flag') == inptone[i]){
				                            xradioone[j].setAttribute('class','checkcheckedxuan');
					                    }
					                } 
						        }
						} 
						var inpttwo = datas[0].PermitSort.split(',');//许可证办理绑定
						for(var i=0;i<inpttwo.length;i++){
						    if( inpttwo[i] ==1 ){
				                    var xradiotwo = document.getElementsByName("PermitSort"+i);
					                for(var j=0;j<xradiotwo.length;j++){
					                    if(xradiotwo[j].getAttribute('flag') == inpttwo[i]){
				                            xradiotwo[j].setAttribute('class','checkcheckedxuan');
					                    }
					                } 
						        }
						} 
			          	var inpt = datas[0].CheckItemsAnswer.split(',');//经营品种绑定
				        inpt.forEach((item, index, array) => {
					        $("#tabletwo .checkradio").eq(index).find("span[flag='"+item+"']").addClass("radioxuan");
					    });         	
			        }else if(TableSort == 3){//表三
			            $('#tablethree').css('display','block');
			            $('#ProductFoodCount').html(datas[0].ProductFoodCount);//生产加工种类
					    $('#PermitDatethree').html(datas[0].PermitDate);//生产加工种类
					    $('#ProductFoodName').html(datas[0].ProductFoodName);//生产加工食品名称
					    $('#FoodCheckDate').html(datas[0].FoodCheckDate);//食品检验时间
					    $('#OriginalCountthree').html(datas[0].OriginalCount);//采购食材原料种类
					    $('#OriginalName').html(datas[0].OriginalName);//采购食材原料名称
			            var inpt = datas[0].CheckItemsAnswer.split(',');//经营品种绑定
				        inpt.forEach((item, index, array) => {
					        $("#tablethree .checkradio").eq(index).find("span[flag='"+item+"']").addClass("radioxuan");
					    });
			        }
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			/*$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}*/
		}
	})
}
var chooseArr1 = [],chooseArr2 = [],chooseArr3 = [];

//初始化放置商户属性
function natureFun(){
	var strHtml = '';
	$.each(busArrNature, function(index, item) {
		strHtml += '<li><p>"'+item.content+'"</p>';
		strHtml += '<div class="radioDiv">';
		strHtml += '<p><span class="yuannoxuan" flag = "1"></span><span>是</span></p><p><span class="yuannoxuan" flag = "0"></span><span>否</span></p>';
		strHtml += '</div></li>';
	})
	$(".busNature ul").html(strHtml);
}
function patrolFun(){
	var strHtml = '';
	$.each(patrolContent, function(index, item) {
		var index = index+1;
		if((index == 1)||(index ==2)||(index == 7)){
			strHtml += '<li class="bounceContent">';
		}else{
			strHtml += '<li>';
		}
		if((index == 1)||(index ==2)||(index == 7)){
			strHtml += '<p class="appendix'+index+'">';
		}else{
			strHtml += '<p>';
		}
		strHtml += '<span class="chooseSpan hasChoose" index = "'+index+'" grade = "'+item.grade+'"></span>'+item.content;
		if((index == 1)||(index ==2)||(index == 7)){
			strHtml += '<span style="color:#35d7ae">（点击查看附件）</span>；';
		}
		strHtml += '</p>';
		strHtml += '</li>';
	})
	$(".contentList ul").html(strHtml);
	//巡查内容复选框勾选
	/*$(".Patrol_content ul li").click(function(){
		$(this).find(".chooseSpan").toggleClass("hasChoose");
		gradeCount();
	})*/
	/*附件弹框*/
	var indexFlag;
	$("[class^='appendix']").click(function(){
		$("[class^='forbid_content']").hide();
		indexFlag = $(this).attr("class").replace(/[^0-9]/ig,"");
		$(".forbid_content"+indexFlag).show(function(){
			$(".content_wrapper").css("position","fixed");
			$(".proto,.proto1").addClass("hover");
		});
		
	})
	//附件弹框取消
	$(".proto .return,.proto1").click(function(){
		$(".content_wrapper").css("position","static");
		$(".proto,.proto1").removeClass("hover");
		//gradeCount();
	})
}
//附件1
function forbidFun1(){
	//console.log(chooseArr1);
	var strHtml = '';
	$.each(forbidList1, function(index, item) {
		strHtml += '<li>';
		strHtml += '<p><span class="chooseSpan"></span><span class="bold"><span class="indexFlag">'+item.index+'、</span>'+item.title+'</span></p>';
		strHtml += '<p class="light">'+item.content+'</p>';
		strHtml += '</li>';
	})
	$(".forbid_content1 ul").html(strHtml);
	$(".forbid_content1 ul li").hide();
	$.each(chooseArr1, function(index, item) {
		$(".forbid_content1 ul li").eq(Number(item)-1).show().find(".indexFlag").html(index+1+"、");
	})
}
//附件2
function forbidFun2(){
	var strHtml = '';
	$.each(forbidList2, function(index, item) {
		strHtml += '<tr>';
		strHtml += '<td>'+item.drugName+'</td>';
		strHtml += '<td>'+item.probidUse+'</td>';
		strHtml += '<td>'+item.probidAnimal+'</td>';
		strHtml += '</tr>';
	})
	$(".forbid_content2 tbody").html(strHtml);
	$(".forbid_content2 tbody tr").hide();
	$.each(chooseArr2, function(index, item) {
		$(".forbid_content2 tbody tr").eq(Number(item)-1).show();
	})
}
//附件3
function forbidFun3(){
	var chooseList1 = chooseArr3.filter(function(item,index){
		return Number(item) < 48
	});
	if(chooseList1.length >= 1){
		$(".disappeara1").show();
		var strHtml1 = '';
		$.each(forbidList3, function(index, item) {
			strHtml1 += '<tr>';
			strHtml1 += '<td>'+item.inedibleName+'</td>';
			strHtml1 += '<td>'+item.foodVarieties+'</td>';
			strHtml1 += '</tr>';
		})
		$("#addFoodList1").html(strHtml1);
		$("#addFoodList1 tr").hide();
		$.each(chooseList1, function(index, item) {
			$("#addFoodList1 tr").eq(Number(item)-1).show();
		})
	}else{
		$(".disappeara1").hide();
	}
	///////////////表二
	var chooseList2 = chooseArr3.filter(function(item,index){
		return Number(item) >= 48
	});
	if(chooseList2.length >= 1){
		var strHtml2 = '';
		$(".disappeara").show();
		$.each(forbidList4, function(index, item) {
			strHtml2 += '<tr>';
			strHtml2 += '<td>'+item.foodClassify+'</td>';
			strHtml2 += '<td>'+item.additive+'</td>';
			strHtml2 += '</tr>';
		})
		$("#addFoodList2").html(strHtml2);
		$("#addFoodList2 tr").hide();
		$.each(chooseList2, function(index, item) {
			$("#addFoodList2 tr").eq(Number(item)-48).show();
		})
	}else{
		$(".disappeara").hide();
	}
}
//放置商户信息
function busInfoList(){
	$(".disappeara").show();
	$("#address").val(busInfo.HAddress);
	$("#address").attr("KeyId",busInfo.KeyId);
	$("#legalPerson").val(busInfo.LegalPerson);
	$("#telphone").val(busInfo.HTel);
	$("#employee").val(busInfo.PPCount);
	$("#healthCard").val(busInfo.HealthCredCount);
	$("#CheckGrade").val(busInfo.CheckGrade);
	if(busInfo.CheckTime!=""){
		$("#CheckTime").val(allTimeChange(busInfo.CheckTime));
	}else{
		$("#CheckTime").val(busInfo.CheckTime);
	}
	$('html,body').animate({scrollTop: '0px'}, 10);
}
function busClassF(ClassF){
	var busName = "";
	if(ClassF == 1){
		busName = "餐饮服务单位";
	}else if(ClassF == 2){
		busName = "销售单位";
	}else if(ClassF == 3){
		busName = "食品加工小作坊";
	}else if(ClassF == 4){
		busName = "小摊贩";
	}
	return busName;
}
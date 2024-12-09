try {

    document.querySelector('#text-description').innerHTML =
        document.querySelector('#text-send').innerHTML =
        document.querySelector('#contact_text').innerHTML = "";

    var dev_mode = false;
    if (dev_mode) { //just remove ! to dev mode.
        document.querySelector('#text-description').innerHTML = "двад жукжукймечáéíóú,+555555,Masculino,32 anos,soltero";
        document.querySelector('#text-send').innerHTML = "hola [field1] tu tel es [field2] tu edad es [field4]";
        document.querySelector('#contact_text').innerHTML = "Juan Perez,573005352504\nAntonio padilla,31189787667";
    }

    var zdgPro = {
        "csv_header": undefined,

        "timer4loadmodules": undefined, //defined in window.ready.

        "timerSend": undefined,

        "attach_index": -1, //index for pickup file
        "attach_files": [],
        "attach_index_caption": -1, //the current selected attach file

        "rpt_data": {},

        "formats": {
            "photo": ["jpg", "png", "gif", "bmp", "webp", "tiff", "tif", "xbm", "jxl", "svg", "svgz", "ico", "apng", "avif", "jfif", "pjp", "pjpeg", "webp", "jpeg"],
            "video": ["mp4", "avi", "mpeg", "wmv", "m4v", "flv", "3gp", "mkv", "webm", "mov"],
            "img": ["raw", "psd", "ai", "eps"],
            "audio": ["mp3", "wav", "ogg", "midi", "amr", "aac", "mp2", "m4a", "wma", "flac", "aac", "m3u", "alac", "dsd"],
            "program": ["html", "js", "py", "htm", "bat", "vb", "sh", "php", "css", "php3", "php4", "php3",
                "pl", "jsp", "jspx", "xhtml", "jtml", "swf", "cfm", "asp", "aspx", "axd", "asx", "asmx",
                "ashx", "rb", "xml", "rss", "cgi", "sass", "less", "hss", "ccss", "pcsss", "c", "cs", "kt", "exe", "bat", "accdb", "sql"],
            "compress": ["zip", "rar", "7z", "tar", "gzip", "bzip2", "wim", "xz", "iso", "bin"],
            "pdf": ["pdf"],
            "word": ["doc", "docx"],
            "excel": ["xls", "xlsx", "xlsxm", "csv"],
            "powerpoint": ["ppt", "pptx"],
            "txt": ['txt']
        },

        "m_pos": 0,

        "can_send": false,

        "panelWidth": 386

    };

    // - - - - - - - - - - - - - - - 
    // UTILS
    // - - - - - - - - - - - - - - - 

    function getBaseUrl() {
        return window.location.href.match(/^.*\//)[0]
    }

    function getById(e) {
        return document.getElementById(e)
    }

    function getByClass(e) {
        return document.getElementsByClassName(e)
    }

    function getBySelector(e) {
        return document.querySelector(e)
    }

    function getByXpath(e) {
        return document.evaluate(e, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }

    function getContains(e, t) {
        var n = document.querySelectorAll(e);
        return Array.prototype.filter.call(n, function (e) {
            return RegExp(t).test(e.textContent)
        })
    }

    function gawe(e) {
        return document.createElement(e)
    }

    function escapeRegExp(e) {
        return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
    }

    function replaceAll(e, t, n) {
        return e.replace(new RegExp(escapeRegExp(t), "g"), n)
    }

    function sp_txt(e) {
        for (var t, n, l, i = new RegExp(/{([^{}]+?)}/), s = getById("" + e).value; null !== (t = i.exec(s));) n = t[1].split("|"), l = Math.floor(Math.random() * n.length), s = s.replace(t[0], n[l]);
        return s
    }

    function checkAppFull4LoadModules() {
        //(getBySelector("div.app") || getBySelector("div.two") || getBySelector("div.three") || getBySelector("div.pane-side")) && (loadModule(), initListener(), clearInterval(zdgPro.timer4loadmodules))
        (getBySelector("div.app") || getBySelector("div.two") || getBySelector("div.three") || getBySelector("div.pane-side")) && (loadModule(), clearInterval(zdgPro.timer4loadmodules))
    }

    function getDateTime() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "_" +
            today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
        return date;
    }

    function gawe_wa(e, t) {
        var a = gawe("a");
        a.id = "xoxo";
        a.href = "http://wa.me/" + e;//+ "?text=" + t;
        document.body.appendChild(a);
    }

    function dump() {
        return "rn" === getById("appx11").innerHTML
    }

    function genRand(min, max, decimalPlaces) {
        var rand = Math.random() * (max - min) + min;
        var power = Math.pow(10, decimalPlaces);
        return Math.floor(rand * power) / power;
    }

    // - - - - - - - - - - - - - - - 
    // CSV READER FUNCTIONS
    // - - - - - - - - - - - - - - - 

    function handleFiles(files) {
        // Check for the various File API support, this for csv fole
        if (window.FileReader) {
            // FileReader are supported.
            getAsText(files[0]);
        } else {
            alert('FileReader are not supported in this browser.');
        }
    }

    function getAsText(fileToRead) {
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(fileToRead);
        // Handle errors load
        reader.onload = loadHandler;
        reader.onerror = errorHandler;
    }

    function loadHandler(event) {
        var csv = event.target.result;
        csv = csv.replace(";", ",");
        csv = csv.split("\n")
        zdgPro.csv_header = (csv[0].toLowerCase().replaceAll(' ', '')).split(',')

        if (zdgPro.csv_header.length >= 2) {
            var invalidphone = /[^(\d*|\)|\(|\+\-)]/gmi;
            if (invalidphone.test(zdgPro.csv_header[1])) {
                getById("text-description").value = csv.slice(1,).join("\n");
                return zdgPro.csv_header;
            }
        }

        // if (zdgPro.csv_header.length > 2) {
        // if (subStatus.match(/approved|complete/i) == null) {
        // zdgPro.csv_header.splice(2,)
        // document.querySelector('#errorMessage').innerText = "More than one column is only available for subscribers."
        // }
        // }

        getById("text-description").value = csv.join("\n");
        zdgPro.csv_header = undefined;
    }

    function processData(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i = 0; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(';');
            var tarr = [];
            for (var j = 0; j < data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
            tarr.push('\n');
        }
        //getById("text-description").value = lines;
    }

    function errorHandler(evt) {
        if (evt.target.error.name == "NotReadableError") {
            alert("Can not read file !");
        }
    }

    // - - - - - - - - - - - - - - - 
    // ZDG MODULE INIT
    // - - - - - - - - - - - - - - - 

    function loadModule() {
        ////window.Store.beta = webpackJsonp([], null, ["cgddafdgie"]);
        //if (!webpackChunkwhatsapp_web_client && !webpackJsonp) return;
        if (!window.Store || !window.Store.Msg) {
            (function () {
                function getStore(modules) {
                    let foundCount = 0;
                    let neededObjects = [
                        { id: "Store", conditions: (module) => (module.default && module.default.Chat && module.default.Msg) ? module.default : null },
                        { id: "Conn", conditions: (module) => (module.default && module.default.ref && module.default.refTTL) ? module.default : (module.Conn ? module.Conn : null) },
                        { id: "MediaCollection", conditions: (module) => (module.default && module.default.prototype && (module.default.prototype.processFiles !== undefined || module.default.prototype.processAttachments !== undefined)) ? module.default : null },
                        { id: "MediaProcess", conditions: (module) => (module.BLOB) ? module : null },
                        { id: "Archive", conditions: (module) => (module.setArchive) ? module : null },
                        { id: "Block", conditions: (module) => (module.blockContact && module.unblockContact) ? module : null },
                        { id: "ChatUtil", conditions: (module) => (module.sendClear) ? module : null },
                        { id: "GroupInvite", conditions: (module) => (module.sendQueryGroupInviteCode) ? module : null },
                        { id: "Wap", conditions: (module) => (module.createGroup) ? module : null },
                        { id: "ServiceWorker", conditions: (module) => (module.default && module.default.killServiceWorker) ? module : null },
                        { id: "State", conditions: (module) => (module.STATE && module.STREAM) ? module : null },
                        { id: "_Presence", conditions: (module) => (module.setPresenceAvailable && module.setPresenceUnavailable) ? module : null },
                        { id: "WapDelete", conditions: (module) => (module.sendConversationDelete && module.sendConversationDelete.length == 2) ? module : null },
                        { id: 'FindChat', conditions: (module) => (module && module.findChat) ? module : null },
                        { id: "WapQuery", conditions: (module) => (module.default && module.default.queryExist) ? module.default : null },
                        { id: 'Perfil', conditions: (module) => module.__esModule === true && module.setPushname && !module.getComposeContents ? module : null },
                        { id: "CryptoLib", conditions: (module) => (module.decryptE2EMedia) ? module : null },
                        { id: "OpenChat", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.openChat) ? module.default : null },
                        { id: "UserConstructor", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.isServer && module.default.prototype.isUser) ? module.default : null },
                        { id: "SendTextMsgToChat", conditions: (module) => (module.sendTextMsgToChat) ? module.sendTextMsgToChat : null },
                        { id: "ReadSeen", conditions: (module) => (module.sendSeen) ? module : null },
                        { id: "sendDelete", conditions: (module) => (module.sendDelete) ? module.sendDelete : null },
                        { id: "addAndSendMsgToChat", conditions: (module) => (module.addAndSendMsgToChat) ? module.addAndSendMsgToChat : null },
                        { id: "sendMsgToChat", conditions: (module) => (module.sendMsgToChat) ? module.sendMsgToChat : null },
                        { id: "Catalog", conditions: (module) => (module.Catalog) ? module.Catalog : null },
                        { id: "bp", conditions: (module) => (module.default && module.default.toString && module.default.toString().includes('bp_unknown_version')) ? module.default : null },
                        { id: "MsgKey", conditions: (module) => (module.default && module.default.toString && module.default.toString().includes('MsgKey error: obj is null/undefined')) ? module.default : null },
                        { id: "Parser", conditions: (module) => (module.convertToTextWithoutSpecialEmojis) ? module.default : null },
                        { id: "Builders", conditions: (module) => (module.TemplateMessage && module.HydratedFourRowTemplate) ? module : null },
                        { id: "Me", conditions: (module) => (module.PLATFORMS && module.Conn) ? module.default : null },
                        { id: "CallUtils", conditions: (module) => (module.sendCallEnd && module.parseCall) ? module : null },
                        { id: "Identity", conditions: (module) => (module.queryIdentity && module.updateIdentity) ? module : null },
                        { id: "MyStatus", conditions: (module) => (module.getStatus && module.setMyStatus) ? module : null },
                        { id: "ChatStates", conditions: (module) => (module.sendChatStatePaused && module.sendChatStateRecording && module.sendChatStateComposing) ? module : null },
                        { id: "GroupActions", conditions: (module) => (module.sendExitGroup && module.localExitGroup) ? module : null },
                        { id: "Features", conditions: (module) => (module.FEATURE_CHANGE_EVENT && module.features) ? module : null },
                        { id: "MessageUtils", conditions: (module) => (module.storeMessages && module.appendMessage) ? module : null },
                        { id: "WebMessageInfo", conditions: (module) => (module.WebMessageInfo && module.WebFeatures) ? module.WebMessageInfo : null },
                        { id: "createMessageKey", conditions: (module) => (module.createMessageKey && module.createDeviceSentMessage) ? module.createMessageKey : null },
                        { id: "Participants", conditions: (module) => (module.addParticipants && module.removeParticipants && module.promoteParticipants && module.demoteParticipants) ? module : null },
                        { id: "WidFactory", conditions: (module) => (module.isWidlike && module.createWid && module.createWidFromWidLike) ? module : null },
                        { id: "Base", conditions: (module) => (module.setSubProtocol && module.binSend && module.actionNode) ? module : null },
                        { id: "Versions", conditions: (module) => (module.loadProtoVersions && module.default && module.default["15"] && module.default["16"] && module.default["17"]) ? module : null },
                        { id: "Sticker", conditions: (module) => (module.default && module.default.Sticker) ? module.default.Sticker : null },
                        { id: "MediaUpload", conditions: (module) => (module.default && module.default.mediaUpload) ? module.default : null },
                        { id: "UploadUtils", conditions: (module) => (module.default && module.default.encryptAndUpload) ? module.default : null },
                        // { id: 'UserPrefs', conditions: (module) => (module.getMaybeMeUser || module.default.getMaybeMeUser ? module : null), },
                        { id: "Vcard", conditions: (module) => (module.parseVcard && module.parseMultiVcard) ? module : null },
                        { id: 'MaybeMeUser', conditions: (module) => (module.getMaybeMeUser ? module : null) },
                    ];
                    for (let idx in modules) {
                        // console.log(modules[idx]);
                        if ((typeof modules[idx] === "object") && (modules[idx] !== null)) {
                            neededObjects.forEach((needObj) => {
                                if (!needObj.conditions || needObj.foundedModule)
                                    return;
                                let neededModule = needObj.conditions(modules[idx]);
                                if (neededModule !== null) {
                                    foundCount++;
                                    needObj.foundedModule = neededModule;
                                }
                            });

                            if (foundCount == neededObjects.length) {
                                break;
                            }
                        }
                    }
                    let neededStore = neededObjects.find((needObj) => needObj.id === "Store");
                    window.Store = neededStore.foundedModule ? neededStore.foundedModule : {};
                    neededObjects.splice(neededObjects.indexOf(neededStore), 1);
                    neededObjects.forEach((needObj) => {
                        if (needObj.foundedModule) {
                            window.Store[needObj.id] = needObj.foundedModule;
                        }
                    });
                    window.Store.Chat.modelClass.prototype.sendMessage = function (e) {
                        window.Store.SendTextMsgToChat(this, ...arguments);
                    }
                    return window.Store;
                }
                const parasite = `parasite${Date.now()}`

                if (typeof webpackJsonp === 'function') webpackJsonp([], { [parasite]: (x, y, z) => getStore(z) }, [parasite]);
                else webpackChunkwhatsapp_web_client.push([[parasite], {}, function (o, e, t) { let modules = []; for (let idx in o.m) { modules.push(o(idx)); } getStore(modules); }]);

            })();
        }
    }


    // - - - - - - - - - - - - - - - 
    // ZDG UTILS
    // - - - - - - - - - - - - - - - 

    window.getNewMessageId = function (chatId) {
        var newMsgId = Store.Msg._models[0].__x_id.clone();
        newMsgId.fromMe = true;
        newMsgId.id = window.getNewId().toUpperCase();
        newMsgId.remote = chatId;
        newMsgId._serialized = `${newMsgId.fromMe}_${newMsgId.remote}_${newMsgId.id}`
        return newMsgId;
    };

    window.getNewId = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    window.getChat = function (id, done) {
        id = typeof id == "string" ? id : id._serialized;
        const found = window.WPP.whatsapp.ChatStore.get(id);
        found.sendMessage = (found.sendMessage) ? found.sendMessage : function () { return window.Store.sendMessage.apply(this, arguments); };
        if (done !== undefined) done(found);
        return found;
    }

    // - - - - - - - - - - - - - - - 
    // VCARD
    // - - - - - - - - - - - - - - - 

    function execSendVcard(chatId) {
        //debugger;
        var vcard = getVcardArray();
        if (Array.isArray(vcard) && vcard.length > 0)
            return window.sendVCard(chatId, vcard)
        else
            return true;
    }

    async function sendLocation(e){
        var lat = getById("lat").value;
        var long = getById("long").value;
        var user = e + "@c.us";
        if (lat != "" && long != "") {
            await WPP.chat.sendLocationMessage(user,{lat:lat,lng:long});
        }
    }
    async function SendPolls(e) {
        var question = getById("textQue").value;
        if (question != "") {
            var arr = [];
            var opt1 = getById("text1").value;
            var opt2 = getById("text2").value;
            var opt3 = getById("text3").value;
            var opt4 = getById("text4").value;
            var opt5 = getById("text5").value;
            var user = e + "@c.us";
            if (opt1 != "") {
                arr.push(opt1);
            }
            if (opt2 != "") {
                arr.push(opt2);
            }
            if (opt3 != "") {
                arr.push(opt3);
            }
            if (opt4 != "") {
                arr.push(opt4);
            }
            if (opt5 != "") {
                arr.push(opt5);
            }
            await WPP.chat.sendCreatePollMessage(user, question, arr);
            //a.href = "https://web.whatsapp.com/send?phone=" + e + "&text=" + t + "&app_absent=0"
        }
    }
    window.sendVCard = async function (chatId, vcard) {

        var chat = window.WPP.whatsapp.ChatStore.get(chatId);
        const fromwWid = WPP.conn.getMyUserId();

        if (chat == undefined) return;

        if (Array.isArray(vcard) && (vcard.length <= 1))
            vcard = vcard.pop();

        // var newId = await getNewMessageId(chatId);
        // var newId =  new window.Store.CreateMsgKey.default({
        //     from: window.Store.Conn.wid,
        //     to: chat.id,
        //     id: window.getNewId(),
        //     selfDir: "out"
        // });

        // var tempMsg = window.createBaseMsg(newId, chat.id);
        // var msg = {};
        // debugger;
        if (Array.isArray(vcard)) {
            var vCardArr = await Promise.all(
                vcard.map(
                    async vcardVal => {
                        return {
                            id: await WPP.contact.queryExists((vCardParser.parse(vcardVal.vcard)[0]).telephone[0].value.replace("+", "")),
                            name: vcardVal.displayName
                        }
                    }
                ));
            vCardArr = vCardArr.filter(x => x.id != null);
            vCardArr = vCardArr.filter(x => x.id != null).map(x => { return { id: x.id.wid.user, name: x.name } })
            msg = WPP.chat.sendVCardContactMessage(chat.id._serialized, vCardArr)
        } else {
            const parsed = vCardParser.parse(vcard.vcard);
            var val = await WPP.contact.queryExists(vCardParser.parse(vcard.vcard)[0].telephone[0].value.replace("+", ""));
            msg = WPP.chat.sendVCardContactMessage(chat.id._serialized, { id: val.wid.user, name: vcard.displayName })
            // delete tempMsg.vcardList;
        }

        // var results = window.Store.addAndSendMsgToChat(chat, tempMsg);
        // var msg = await results[0];
        // var result = await results[1];
        // if (result === "OK") {
        return msg;
        // } else {
        //     throw new Error(result);
        // }
    };

    window.createBaseMsg = function (id, to) {
        return {
            t: parseInt(new Date().getTime() / 1000), //window.Store.GlobalUnixTime.globalUnixTime(),
            from: WPP.conn.getMyUserId(),
            isNewMsg: !0,
            to: to,
            self: "out",
            type: "unknown",
            ack: 0,
            local: !0,
            id: id
        };
    };

    function getVcardArray() {
        var vcardName_template = "FN;CHARSET=UTF-8:{_name_}";
        var vcardPhone_template = "TEL;TYPE=CELL:{_phone_}";
        var vcard_template = "BEGIN:VCARD\nVERSION:3.0\n{_name_}\n{_phones_}\nEND:VCARD";
        vcard = [];

        var contact = document.querySelector('#contact_text').value;

        if (contact.trim() == "") return [];

        var contact_arr = contact.split("\n");

        for (let index = 0; index < contact_arr.length; index++) {
            var fields = contact_arr[index].split(",");
            var name = "";
            var phones = "";
            if (fields.length <= 1) return false;

            for (let i = 1; i < fields.length; i++) {
                var field = fields[i];
                //phones
                if (/[^0-9+-.\(\)\[\]]/.test(field)) return false; //antiregex.
                phones += (phones == "" ? "" : "\n") + vcardPhone_template.replace("{_phone_}", field);
            }

            name = fields[0];
            var vcardname = vcardName_template.replace("{_name_}", name);

            var vcard_full = vcard_template.replace("{_name_}", vcardname).replace("{_phones_}", phones);

            vcard.push({ "displayName": name, "vcard": vcard_full });
        }
        return vcard;
    }

    //} - - - - - - - - - - - - - - - 
    // SEND IMAGE
    // - - - - - - - - - - - - - - - 

    window.sendImage = async function (idChat, index_contact, CalcVal) {
        return new Promise((resolve, reject) => {
            const attach_files = zdgPro.attach_files;
            const results = [];

            let processedCount = 0;

            const checkCompletion = () => {
                processedCount++;
                if (processedCount === attach_files.length) {
                    resolve(results);
                }
            };

            for (const element of attach_files) {
                const reader = new FileReader();

                reader.onloadend = (function (currentElement) {
                    return async () => {
                        try {
                            //debugger;
                            var cap = currentElement["caption"];
                            CalcVal.forEach((e, i) => {
                                if (i == 0)
                                    cap = cap.replaceAll("[name]", "" + e)
                                else if (i == 1)
                                    cap = cap.replaceAll("[number]", "" + e)
                                //else {
                                cap = cap.replaceAll(`[field${i + 1}]`, "" + e)

                                //}
                            });
                            const val = await WPP.chat.sendFileMessage(idChat, reader.result, { caption: cap, filename: currentElement.file.name });
                            results.push(val);
                            checkCompletion();
                        } catch (error) {
                            results.push({ ack: 10 });
                            checkCompletion();
                        }
                    };
                })(element);

                reader.readAsDataURL(element.file);
            }
        });
    };


    function replaceCaptioInImg(msg, i) {
        //debugger;
        var phonelist = getById("text-description").value;
        //debugger;
        if (phonelist.indexOf(';') > -1) {
            for (var g = phonelist.match(/(.*|\s);.+/gm), u = 0; u < g.length; u++) g[u] = g[u]

        } else {

            for (var g = phonelist.match(/(.*|\s),.+/gm), u = 0; u < g.length; u++) g[u] = g[u]
        }

        u = i - 1;

        var m = msg;
        var r;
        if (phonelist.indexOf(',') > -1) {
            r = g[u].split(",");
        }
        else {
            r = g[u].split(";");
        }

        r.forEach((e, i) => {
            if (i == 0) {
                m = m.replaceAll("[name]", "" + e)
            }
            else if (i == 1) {
                m = m.replaceAll("[number]", "" + e)
            }
            //else {
            m = m.replaceAll(`[field${i + 1}]`, "" + e)
        })
        if (zdgPro.csv_header) {
            zdgPro.csv_header.forEach((e, i) => {
                var field_ = `[${e.toLowerCase().trim().replace("\n", "").replace("\r", "")}]`
                m = m.replaceAll(field_, "" + r[i])
            })
        } else {
            ////m = replaceAll("" + p, "[name]", "" + r[0]),
            ////w = replaceAll("" + f, "[name]", "" + r[0]);            
        }

        return m;
    }

    function setCanSend(v) {
        zdgPro.can_send = (v == true);
    }

    function formatNumber(number) {
        // Remove espaços, hifens, parênteses e sinais de mais
        let cleanedNumber = number.replace(/[\s()-]/g, '').replace(/^\+/, '');
    
        // Se o número começar com 55, removemos isso temporariamente para tratar o DDD e o número local
        let startsWithDDI = cleanedNumber.startsWith('55');
        if (startsWithDDI) {
            cleanedNumber = cleanedNumber.slice(2);
        }
    
        // Verifica e remove o nono dígito se ele for o primeiro após o DDD
        if (cleanedNumber.length === 11 && cleanedNumber[2] === '9') {
            cleanedNumber = cleanedNumber.slice(0, 2) + cleanedNumber.slice(3);
        }
    
        // Reanexamos o DDI 55 se ele estava presente
        if (startsWithDDI) {
            cleanedNumber = '55' + cleanedNumber;
        } else {
            cleanedNumber = '55' + cleanedNumber; // Adiciona 55 se não começar com DDI
        }
    
        return cleanedNumber;
    }
    
    function prepareNameAndNumber() {
        var textArea = getById("text-description");
        var lines = textArea.value.split("\n");
        var processedEntries = lines.map(line => {
            if (!line.includes(',')) {
                line = "Sem Nome, " + line.trim();
            }
    
            var [name, number] = line.split(',').map(part => part.trim());
    
            // Verifica se o número tem pelo menos 10 caracteres (DDD + número)
            if (number.length < 10) {
                window.alert(`O número "${number}" não possui DDD. Por favor, adicione o DDD.`);
                return line; // Retorna a linha original sem modificações
            }
    
            // Formata o número
            number = formatNumber(number);
    
            return `${name}, ${number}`;
        });
        textArea.value = processedEntries.join("\n"); // Atualiza o valor de text-description com os dados processados
    }
    
    
    getById("formatar").onclick = prepareNameAndNumber;

    getById("insert_wa").onclick = function () { //Prepare button
        //debugger;
        initAndShowReportPanel(false);

        setCanSend(false);

        var e = getById("text-description").value; //its the number and name textbox
        var t = getById("text-send").value;  //the text textbox
        var n = getById("capt").value;

        var textWasEmpty;

        if (textWasEmpty = (t == "" || !t))
            t = encodeURIComponent(" "); //keep in mind this is a special white char. not just empty space.

        var l = false; //getById("s_img").checked;
        var i = ""; //getById("o_imgs").getAttribute("src");

        var s = dump();
        var r = getById("myTable_Wa");

        r.innerHTML = "";

        var vCardArray = getVcardArray();
        //debugger;
        if (!Array.isArray(vCardArray) || ((vCardArray.length <= 0) && textWasEmpty && (zdgPro.attach_files.length == 0))) {
            var pass = true;
        } else if (sessionStorage.setItem("wa_num", e), sessionStorage.setItem("wa_psn", t), sessionStorage.setItem("wa_capt", n), e && (!e || t || l || i) && (e || t || l || i) && (!l || i)) {
            //if ((!(e = e.match(/(.*|\s),.+/gm), !s) && (null != e))|| (!(e = e.match(/(.*|\s);.+/gm), !s) && (null != e))) {    
            if (!(e = e.match(/(.*|\s);.+/gm), !s) && (null != e)) {

                for (var a = 0; a < e.length; a++) e[a] = e[a]//.replace(/[^a-z\d\s,]+/gim, "");
                var o = [];
                if (!(r.innerHTML = "", !s)) {
                    setCanSend(true);
                    for (a = 0; a < e.length; a++) {
                        o[a] = e[a].split(";");
                        if (o[a] <= 1) {
                            setCanSend(false);
                            break;
                        }
                        var d = r.insertRow(a),
                            c = replaceAll(o[a][1], " ", "");
                        d.insertCell(0).innerHTML = "" + o[a][0] || 0;
                        d.insertCell(1).innerHTML = parseInt(c);
                        d.insertCell(2).innerHTML = "esperando";
                    }
                    $("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1;
                    ////r.innerHTML = "Prepared";
                    ////$("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1
                }
            }
            e = getById("text-description").value;
            if (!(e = e.match(/(.*|\s),.+/gm), !s) && (null != e)) {
                for (var a = 0; a < e.length; a++) e[a] = e[a]//.replace(/[^a-z\d\s,]+/gim, "");
                var o = [];
                if (!(r.innerHTML = "", !s)) {
                    setCanSend(true);
                    for (a = 0; a < e.length; a++) {
                        o[a] = e[a].split(",");
                        if (o[a] <= 1) {
                            setCanSend(false);
                            break;
                        }
                        var d = r.insertRow(a),
                            c = replaceAll(o[a][1], " ", "");
                        d.insertCell(0).innerHTML = "" + o[a][0] || 0;
                        d.insertCell(1).innerHTML = parseInt(c);
                        d.insertCell(2).innerHTML = "esperando";
                    }
                    $("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1;
                    ////r.innerHTML = "Prepared";
                    ////$("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1
                }
            }
            if (zdgPro.can_send) return;
        }
        //// if (!s) return;
        r.innerHTML = " Error: confira números, mensagens e anexos. ";
        $("#wa_count").text(0);
        getById("m0rt4lxC1").disabled = !0
    };



    function getNotificationCount() {
        userId = localStorage.getItem("id");
        var URL1 = URLMain + "/api/Notifications/GetNotificationCountByUserId?Id=" + userId + "";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", URL1, false);
        //xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send();
        //debugger;
        var data = JSON.parse(xmlhttp.responseText);
        //console.log(xmlhttp.status);
        //console.log(xmlhttp.responseText + "--------" + data.status);
        //console.log(data.data);
        //console.log((data.data).get(0));
        if (data.data <= 9) {
            document.getElementById("countNotification").innerHTML = data.data;

        } else {
            document.getElementById("countNotification").innerHTML = "9+";
        }
    }

    // - - - - - - - - - - - - -
    // Send BTN
    // - - - - - - - - - - - - -

    // getById("text2").onchange = function(){
    //     debugger;
    //     var button = document.createElement('input');
    //     button.type = 'text';
    //     var container = document.getElementById('OptTag');
    // container.appendChild(button);
    // }

    getById("DK").onclick = function () {
        getById("DK").display = none;
    };



    getById("back").onclick = function () {
        getById("settings").style.display = "none";
        getById("page-1").style.display = "block";
        getById("page-0").style.display = "block";
        getById("showChangePassword").style.display = "none";
    };
    getById("settingsSend").onclick = function () {
        getById("page-1").style.display = "none";
        getById("page-0").style.display = "none";
        getById("DK").style.display = "none";
        getById("settings").style.display = "block";
    };

    getById("closeNotification").onclick = function () {
        document.getElementById("tooltipdata").style.display = "none";
    };
    getById("btnChangePass").onclick = function () {
        getById("showChangePassword").style.display = "block";
    };
    getById("notification").onclick = function () {
        document.getElementById("tooltipdata").style.display = "block";
        itemJson = '{"id": "' + userId + '","oldPassword": "' + oldPass + '","newPassword": "' + newPass + '"}';
        var URL = URLMain + "/api/Notifications/GetNotificationsByUserId2?Id=" + userId + "";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", URL, false);
        //xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send();
        //debugger;
        var data = JSON.parse(xmlhttp.responseText);
        //console.log(xmlhttp.status);
        //console.log(xmlhttp.responseText + "--------" + data.status);
        //console.log(data.data);
        if (data.status == 1) {
            getNotificationCount();
            var arra = [];
            arra = data.data;
            var text = "";
            if (arra.length > 0) {

                for (let i = 0; i < arra.length; i++) {
                    var j = i + 1;
                    text += "[" + j + "] " + arra[i].messageText + '\r\n';
                }
            }
            else {
                text = "No new notification found";
            }
            document.getElementById("messageNotification").innerHTML = text;
            //console.log(text);

            //alert(text);    
        }
        else {
            alert(data);
        }
    };


    getById("btnSubmitPass").onclick = function () {
        var oldPass = document.getElementById("oldPass").value;
        var newPass = document.getElementById("newPass").value;
        var confirmPass = document.getElementById("confirmPass").value;
        if (newPass == confirmPass) {
            itemJson = '{"id": "' + userId + '","oldPassword": "' + oldPass + '","newPassword": "' + newPass + '"}';
            var URL = URLMain + "/api/Users/ChangePasswordById";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", URL, false);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(itemJson);
            //debugger;
            var data = JSON.parse(xmlhttp.responseText);
            //console.log(xmlhttp.responseText + "--------" + data.status);

            if (data.status == 1) {
                alert("update password done ");
                getById("showChangePassword").style.display = "none";
            }
            else {
                alert(data.message);
            }
        }
        else {
            alert("Confirm password not matching");
        }
    };



    getById("logoutSend").onclick = function () {
        //alert("Click");
        localStorage.clear();
        sessionStorage.clear();
        document.getElementById("email").innerHTML = '';
        document.getElementById("password").innerHTML = '';
        document.getElementById("nameId").innerHTML = '';
        document.getElementById("nameId1").innerHTML = '';
        document.getElementById("deviceId").innerHTML = '';
        document.getElementById("devices").innerHTML = 'You have successfully logout. Kindly refresh the browser link to login again.';
        //document.getElementById("countNotification").innerHTML= "You have successfully logout.";
        //document.getElementById("countNotification").style.height = "550px";
        getById("settings").style.display = "none";
        getById("page-1").style.display = "none";
        getById("page-0").style.display = "none";
        getById("DK").style.display = "none";
    };

    getById("logoutSend1").onclick = function () {
        //alert("Click");
        localStorage.clear();
        sessionStorage.clear();
        document.getElementById("email").innerHTML = '';
        document.getElementById("password").innerHTML = '';
        document.getElementById("nameId").innerHTML = '';
        document.getElementById("nameId1").innerHTML = '';
        document.getElementById("deviceId").innerHTML = '';
        document.getElementById("devices").innerHTML = 'You have successfully logout. Kindly refresh the browser link to login again.';
        //document.getElementById("countNotification").innerHTML= "You have successfully logout.";
        //document.getElementById("countNotification").style.height = "550px";
        getById("settings").style.display = "none";
        getById("page-1").style.display = "none";
        getById("page-0").style.display = "none";
        getById("DK").style.display = "none";
    };

    function AlreadyLoggedIn() {
        userId = localStorage.getItem("id");
        var firstName = localStorage.getItem("firstName");
        var lastName = localStorage.getItem("lastName");
        var expireAt = localStorage.getItem("expireAt");
        var totalActive = localStorage.getItem("totalActive");
        var quantity = localStorage.getItem("quantity");
        var deviceId = localStorage.getItem("deviceId");
        //getById("logoutSend").style.display="inline-block";
        //getById("logoutSend").style.background="blue";
        getById("page-1").style.display = "block";
        getById("page-0").style.display = "block";
        getById("DK").style.display = "none";
        //var data = localStorage.getItem("data");

        //userId = data.id;
        // document.getElementById("nameId").innerHTML = "Hello, " + firstName + " " + lastName;

        let date_1 = new Date(expireAt);
        let date_2 = new Date();
        let v = Math.round(Math.abs((date_1 - date_2) / (24 * 60 * 60 * 1000)));
        // document.getElementById("nameId1").innerHTML = "Your membership expires in " + v + " days.";
        // document.getElementById("devices").innerHTML = "Devices " + totalActive + "/" + quantity;
        // document.getElementById("deviceId").innerHTML = "Device Id " + deviceId + "";
        getNotificationCount();
        setInterval(getNotificationCount, 900000);



    };
    var userId = 0;
    var URLMain = "https://zdg.com.br";
    //var URLMain="http://9.51.512.21";
    var email = localStorage.getItem("email");
    var password = localStorage.getItem("password");
    if (email != null && email != "" && password != null && password != "") {
        userId = localStorage.getItem("id");
        AlreadyLoggedIn();
    }

    // LOGIN COM CHAVE

    document.getElementById("loginSend").onclick = async function() {
        var key = document.getElementById("password").value;
    
        if (key == "") {
            window.alert("Por favor insira a sua chave de acesso!");
        } else {
            try {
                const response = await fetch(`https://api-key-gen.vercel.app/api/${key}`);
                if (response.status === 200) {
                    localStorage.setItem('savedPassword', key);
                    AlreadyLoggedIn();
                } else if (response.status === 201) {
                    window.alert("Chave vencida");
                    window.location.href = `https://api.whatsapp.com/send/?phone=556281465854&text=Ol%C3%A1%21+Gostaria+de+renovar+minha+licen%C3%A7a+da+BillZap&type=phone_number&app_absent=0`
                } else if (response.status === 404) {
                    window.alert("Chave inválida");
                } 

            } catch (error) {
                
            }
        }
    };
    


    function callbackFunction(xmlhttp) {
        alert(xmlhttp.responseXML);
    };


    getById("m0rt4lxC1").onclick = function () {
        //console.log("dfghgjgkhg");
        if (!zdgPro.can_send) {

            return;
        }

        activatePanelPlayStop(true);

        var e = getById("text-description").value;
        var t = getById("s_tdy").checked;

        //legacy options.
        var n = zdgPro.attach_files.length > 0;  //getById("s_img").checked; 
        var l = n ? "proceed" : "";          //getById("o_imgs").getAttribute("src");

        var i1 = parseInt(getById("dly_wa").value) || 5;
        var i2 = parseInt(getById("dly_wa2").value) || 10;
        var i = parseInt(genRand(i1, i2, 2));
        var s = getById("myTable_Wa");

        var r = [];
        var a = [];
        var o = [];
        var d = [];
        var CalcValue = [];
        var c = dump();

        /*getById("m0rt4lxC1").disabled = 
        getById("s_tdy").disabled =  
        //getById("s_img").disabled = 
        //getById("getImgs").disabled = 
        getById("insert_wa").disabled = 
        getById("text-description").disabled = 
        getById("text-send").disabled = 
        getById("capt").disabled = 
         //getById("del").disabled = 
        getById("contact_text").disabled = !0;*/

        i < 5 && (i = 5);
        //debugger;
        if (e.indexOf(',') > -1) {
            for (var g = e.match(/(.*|\s),.+/gm), u = 0; u < g.length; u++) g[u] = g[u]//.replace(/[^a-z\d\s,]+/gim, "");
        }
        else {
            for (var g = e.match(/(.*|\s);.+/gm), u = 0; u < g.length; u++) g[u] = g[u]//.replace(/[^a-z\d\s,]+/gim, "");
        }

        for (u = 0; u < g.length; u++) {
            var p = sp_txt("text-send");
            var imgcaption = sp_txt("capt");
            if (e.indexOf(',') > -1) {
                r[u] = g[u].split(",");
            }
            else {
                r[u] = g[u].split(";");
            }
            let m = "" + p
            let w = "" + imgcaption
            CalcValue = r;
            r[u].forEach((e, i) => {
                if (i == 0) {
                    m = m.replaceAll("[name]", "" + e)
                    imgcaption = imgcaption.replaceAll("[name]", "" + e)
                }
                else if (i == 1) {
                    m = m.replaceAll("[number]", "" + e)
                    imgcaption = imgcaption.replaceAll("[number]", "" + e)
                }
                //else {
                m = m.replaceAll(`[field${i + 1}]`, "" + e)
                imgcaption = imgcaption.replaceAll(`[field${i + 1}]`, "" + e)

                //}
            })
            if (zdgPro.csv_header) {
                zdgPro.csv_header.forEach((e, i) => {
                    var field_ = `[${e.toLowerCase().trim().replace("\n", "").replace("\r", "")}]`
                    m = m.replaceAll(field_, "" + r[u][i])
                    imgcaption = imgcaption.replaceAll(field_, "" + r[u][i])

                })
            } else {
                ////m = replaceAll("" + p, "[name]", "" + r[u][0]),
                ////w = replaceAll("" + f, "[name]", "" + r[u][0]);

            }
            //// var m = replaceAll("" + p, "[name]", "" + r[u][0]),
            ////     w = replaceAll("" + f, "[name]", "" + r[u][0]);

            a[u] = encodeURIComponent(m); // Message replaced and URI encoded 
            o[u] = w; // ??
            var y = replaceAll(r[u][1], " ", ""); //Phone not spaces
            d[u] = parseInt(y) || 0; //Phone as Int
        }

        //c , d , o , a

        c && function () {
            var e = d.length, r = 0;
            ! function c() {
                var u = d[r],
                    p = o[r];
                if (gawe_wa(d[r], a[r]), getById("xoxo").click(), document.body.removeChild(getById("xoxo")), r % 125 == 0) {
                    var f = i;
                    $("#wa_count").text("pause +- 2 min then go")
                } else if (r % 50 == 0) f = i + 15;
                else if (r % 20 == 0) f = i + 8;
                else if (r % 5 == 0) f = i + 3;
                else f = i;

                //debugger;
                setTimeout(
                    async function (textVal, calcVal) {
                        try {
                            var index = r - 1;
                            if (!WPP.chat.get(u.toString())) {
                                await gawe_wa(u.toString());
                                await getById("xoxo").click();
                                document.body.removeChild(getById("xoxo"));
                            }
                            //debugger;
                            if (textVal && textVal != "") {
                                var returnVal = await WPP.chat.sendTextMessage(u + "@c.us", decodeURIComponent(textVal));
                                s.rows[index].cells[2].innerHTML = "offline";
                                if (returnVal?.ack == 1 || returnVal?.ack == 2 || returnVal?.ack == 3)
                                    s.rows[index].cells[2].innerHTML = "enviado"
                            }
                            if (zdgPro.attach_files.length > 0) {
                                var val = await window.sendImage(u + "@c.us", index, calcVal)
                                s.rows[index].cells[2].innerHTML = "offline";
                                val.forEach(element => {
                                    if (element?.ack == 1 || element?.ack == 2 || element?.ack == 3)
                                        s.rows[index].cells[2].innerHTML = "enviado"
                                });
                            }
                            
                            await sendLocation(u);
                            await SendPolls(u);
                            if (vcardFailed) s.rows[index].cells[2].innerHTML = "offline";
                            else
                                var val = await execSendVcard(u + "@c.us");
                            if (val == undefined) s.rows[index].cells[2].innerHTML = "offline";
                            var vcardFailed = val == undefined;
                            if (!vcardFailed) s.rows[index].cells[2].innerHTML = "enviado";
                        } catch (ex) {
                            s.rows[index].cells[2].innerHTML = "offline"
                        }
                        if (index + 1 >= s.rows.length) {
                            activatePanelPlayStop(false);
                            initAndShowReportPanel(true);
                        }
                    },
                    2500, a[r], CalcValue[r]);


                $("#wa_count").text(r + 1 + " from " + g.length);
                r++;

                ////getById("getImgs").disabled  getById("s_img").disabled =

                if (zdgPro.timerSend) { zdgPro.timerSend.dispose(); }

                e <= 1 && (getById("s_tdy").disabled = getById("insert_wa").disabled = getById("text-description").disabled = getById("text-send").disabled = getById("capt").disabled = getById("contact_text").disabled = !1);
                --e && (zdgPro.timerSend = new zdgPro.Timer(c, f + "000"))

            }()
        }()




    };

    getById("uploadCSV").onclick = function () {
        //getById("DK").style.display="block";
        getById("csvFileInput").click();
    };

    getById("attach_del_full").onclick = function () {
        var len = getByClass("attach_div2").length;
        for (var i = 0; i < len; i++)
            onRemoveAttachAtIndex(i);
    };

    function updateAttachFileStatus(attachIndex) {  //0 removed , 1 - n , added
        var totalAttachment = getByClass("attach_div2").length;
        var totalCurAttach = 0;
        for (var ii = 0; ii < zdgPro.attach_files.length; ii++)
            if (zdgPro.attach_files[ii])
                totalCurAttach++;
        getById("attach_file_status").innerHTML = " [ $1 / $2 ]".replace("$1", totalCurAttach).replace('$2', totalAttachment)
        updateCaptionAttach(attachIndex)
    }

    function onChangeCaption(e) {
        zdgPro.attach_index_caption != -1 &&
            ////zdgPro.attach_files[zdgPro.attach_index_caption] &&
            ////(zdgPro.attach_files[zdgPro.attach_index_caption].caption) &&
            (zdgPro.attach_files[zdgPro.attach_index_caption].caption = e.target.value);
    }

    function updateCaptionAttach(attachIndex) {
        var cap = getById("capt");

        var clearCaption = zdgPro.attach_index_caption != attachIndex;

        zdgPro.attach_index_caption = attachIndex; //here could be -1.

        cap.removeEventListener("input", onChangeCaption);

        if (clearCaption)
            cap.value = "";

        var extValid4Caption = (attachIndex > -1)

        if (extValid4Caption) {
            var ext = getFileInfo(zdgPro.attach_files[attachIndex].file.name)["ext"];
            extValid4Caption = zdgPro.formats["photo"].indexOf(ext) > -1 || zdgPro.formats["video"].indexOf(ext) > -1;
        }

        if (cap.disabled = !extValid4Caption) {
            cap.placeholder = "Título disponível apenas para imgs/videos";
        } else {
            cap.placeholder = "Título do anexo # " + (attachIndex + 1);

            if (zdgPro.attach_index_caption > -1 && zdgPro.attach_files[zdgPro.attach_index_caption])
                cap.value = zdgPro.attach_files[zdgPro.attach_index_caption].caption;

            cap.addEventListener("input", onChangeCaption);
        }
    }

    function onRemoveAttachAtIndex(i) {
        getById("lbltxt_" + i).innerText = "###";
        getById("attach_img_" + i).src = "";

        setAttachIcon(i, "fa-plus-square");

        setModeOnAttached(i, "sel_no_attach");

        var new_attach_files = [];

        var count = 0;
        for (var ii = 0; ii < zdgPro.attach_files.length; ii++)
            if (zdgPro.attach_files[ii] && ii != i)
                ////if (zdgPro.attach_files[ii] && zdgPro.attach_files[ii].files!=undefined && ii!=i)
                new_attach_files[ii] = zdgPro.attach_files[ii];

        zdgPro.attach_files = new_attach_files;

        updateAttachFileStatus(-1);
    }

    function setAttachIcon(i, mode, extraclass) {
        if (extraclass == undefined)
            extraclass = "attach_i far fa-5x "
        getById("attach_i_" + i).setAttribute("class", extraclass + mode);
    }

    function setModeOnAttached(i, mode, extraclass) {
        if (extraclass == undefined)
            extraclass = "attach_div2 ";
        getByClass("attach_div2")[i].setAttribute("class", extraclass + mode);
    }

    function onPickAttachFile(files) {
        if (!(files || files.length > 0))
            return;

        var num_slot_files = getByClass("attach_div2").length;

        var count = 0; //name, size
        ////for (var i=zdgPro.attach_index; i<num_slot_files-zdgPro.attach_index && count<files.length   ;i++){
        for (var i = zdgPro.attach_index; i < num_slot_files && count < files.length; i++) {
            if (zdgPro.attach_files[i] == undefined)
                zdgPro.attach_files[i] = { "file": "", "caption": "" };
            var f = zdgPro.attach_files[i].file = files[count++];
            putIconOrImg(f, i);
        }

        getById("attach_file_diag").value = "";
        updateAttachFileStatus(i - 1);

        zdgPro.attach_index = -1;
    }

    function getFileInfo(n) {
        var separator = n.indexOf('\\') > -1 ? "\\" : "/";
        ////n=n.split(separator)
        var path = n.split(separator);
        var name = path.pop();
        var name = name.split(".");
        var ext = (name.pop()).toLowerCase();
        path = path.join(separator);

        return { "ext": ext, "path": path, "name": name[0] }
    }


    function putIconOrImg(f, i) { //file , index
        ////var name_ext=f.name.split(".");
        ////var ext=(name_ext.pop()).toLowerCase();
        ////var fullname = name = name_ext.join(".");
        var fi = getFileInfo(f.name);
        var ext = fi.ext;
        var fullname = name = (fi.name + "." + fi.ext);

        if (fullname.length > 30)
            name = name.substr(0, 30) + "...";
        getById("lbltxt_" + i).innerText = name;

        var format_class;

        if (zdgPro.formats["photo"].indexOf(ext) > -1) {
            //Include the photo in preview.
            format_class = "photo";
        } else if (zdgPro.formats["img"].indexOf(ext) > -1) {
            format_class = "fa-file-image";
        } else if (zdgPro.formats["video"].indexOf(ext) > -1) {
            format_class = "fa-file-video";
        } else if (zdgPro.formats["audio"].indexOf(ext) > -1) {
            format_class = "fa-file-audio";
        } else if (zdgPro.formats["program"].indexOf(ext) > -1) {
            format_class = "fa-file-code";
        } else if (zdgPro.formats["compress"].indexOf(ext) > -1) {
            format_class = "fa-file-archive";
        } else if (zdgPro.formats["pdf"].indexOf(ext) > -1) {
            format_class = "fa-file-pdf";
        } else if (zdgPro.formats["word"].indexOf(ext) > -1) {
            format_class = "fa-file-word";
        } else if (zdgPro.formats["excel"].indexOf(ext) > -1) {
            format_class = "fa-file-excel";
        } else if (zdgPro.formats["powerpoint"].indexOf(ext) > -1) {
            format_class = "fa-file-powerpoint";
        } else if (zdgPro.formats["txt"].indexOf(ext) > -1) {
            format_class = "fa-file-alt";
        } else {
            format_class = "fa-question-circle";
        }
        if (format_class == "photo") {
            getById("attach_img_" + i).src = URL.createObjectURL(f);
            setModeOnAttached(i, "sel_attach_img");

        } else {
            setModeOnAttached(i, "sel_attach_not_img");
            setAttachIcon(i, format_class);
        }
    }

    function onAttachImgIconClick(e) {
        var id_index = undefined;
        if (!(e && e.target && ((id_index = e.target.id.split("_")).length) >= 2))
            return;

        zdgPro.attach_index = parseInt(id_index.pop());
        var id = id_index.join("_");

        var filename = zdgPro.attach_files[zdgPro.attach_index];

        if (filename != undefined)
            updateCaptionAttach(zdgPro.attach_index);
        else
            updateCaptionAttach(-1);

        if (!(id == "attach_del")) {
            var attach_file_diag = getById("attach_file_diag");
            if ((id == "lbltxt") && (filename != undefined)) {
                getElementById("capt").focus();
                var v = getElementById("capt").value;
                getElementById("capt").setSelectionRange(v.length, v.length, "forward");
                //getElementById("capt").select();
            }
            else {
                attach_file_diag.click();
            }
        } else {
            onRemoveAttachAtIndex(zdgPro.attach_index);
        }
    }

    function showReportPanel(show_) {
        document.getElementById("table_rpt").style.display = (show_ == true) ? "table" : "none";
    }

    function getRptValueFromIndex(index) {

        var row_rpt_name = (getById("tr_rpt_" + index).innerText.split(":")[0]); //.cells[0].split(":")[0]
        row_rpt_name = row_rpt_name.toLowerCase().replace(" ", "").replace("-", "").replace("_", "");

        for (var key in zdgPro.rpt_data) {
            if (key.toLowerCase().substr(0, 3) == row_rpt_name.substr(0, 3))
                return zdgPro.rpt_data[key];
        }
        return [];
    }

    function initAndShowReportPanel(show_) {
        if (!show_) {
            zdgPro.rpt_data = { "all": [], "not_send": [] };
        }
        else {
            var data_rows = getById("text-description").value.split("\n");
            var trs_rpt_res = document.querySelectorAll("#myTable_Wa tr");
            var len = trs_rpt_res.length;
            if (data_rows.length != len) {
                console.log("Data row inf != Row result" + data_rows.length + "::" + len);
                len = Math.min(len, data_rows.length)
            }
            for (var i = 0; i < len; i++) {
                var tr = trs_rpt_res[i];
                var res = tr.cells[2].textContent;
                if (zdgPro.rpt_data[res] == undefined) {
                    zdgPro.rpt_data[res] = [data_rows[i]];
                } else {
                    zdgPro.rpt_data[res].push(data_rows[i]);
                }
                zdgPro.rpt_data["all"].push(data_rows[i]);
                if (res != "send")
                    zdgPro.rpt_data["not_send"].push(data_rows[i]);
            }
            tr_rpt = document.querySelectorAll("#table_rpt tr");
            for (i = 1; i < tr_rpt.length - 1; i++) {  //First and last row, this work just for decorative purpose, to add empty spaces
                tr = tr_rpt[i];
                var res = getRptValueFromIndex(i - 1);
                // console.dir(res)            ;
                if (res["length"] > 0) {
                    tr.style.display = "table-row";
                    document.querySelector("#tr_rpt_" + (i - 1) + " .val1").textContent = res["length"];
                    var pctg = (((res["length"] / len) * 100) + "")
                    if (parseInt(pctg) < 100) pctg = pctg.slice(0, 2);
                    document.querySelector("#tr_rpt_" + (i - 1) + " .val2").textContent = pctg + "%";
                } else {
                    tr.style.display = "none";
                }
            }
        }
        showReportPanel(show_); //this only hide or show the panel.
    }

    function onClickRptOption(e) {
        var tr = e.currentTarget;
        if ((tr == undefined) || (!tr.id)) return;
        var numid = tr.id.split("_").pop();
        var data = getRptValueFromIndex(numid);
        var header = zdgPro.csv_header;
        if (Array.isArray(header))
            header = header.join(",");
        // missing the name, here
        var name = tr.innerText.split(":")[0] + "_" + getDateTime();
        var content = (header && header.trim() != "") ? header + "\n" + data.join("\n") : "" + data.join("\n");
        downloadRpt(content, name + ".csv")
    }

    function downloadRpt(content = "empty", filename = "notset.txt", contentType = "text/plain;charset=UTF-8") {
        var a = document.createElement('a');
        const file = new Blob([content], { type: contentType, encoding: "UTF-8", });

        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();

        URL.revokeObjectURL(a.href);
    }

    function activatePanel(v, panel) {
        var activate_css = v ? "enable-panel" : "disable-panel";

        for (var i of ["enable-panel", "disable-panel"])
            getById(panel).classList.remove(i);

        getById(panel).classList.add(activate_css);
    }

    function activatePanelPlayStop(v) {
        activatePanel(v, "panel-play-stop");

        //zdgPro.timerSend=undefined;

        var playpausei = getById("play-pause").getElementsByTagName("i")[0];
        for (var i of ["fa-play-circle", "fa-pause-circle"])
            playpausei.classList.remove(i);
        if (v)
            playpausei.classList.add("fa-pause-circle");
        else
            playpausei.classList.add("fa-play-circle");

        if (zdgPro.timerSend) { zdgPro.timerSend.dispose(); }
    }

    function onStop(e) {
        activatePanelPlayStop(false);
        initAndShowReportPanel(true);
    }

    function onPlayPause(e) {
        var playpausei = getById("play-pause").getElementsByTagName("i")[0];

        var playpauseclass = playpausei.classList.contains("fa-play-circle") ? "fa-pause-circle" : "fa-play-circle";

        //if (playpauseclass=="fa-pause-circle")
        //else

        //for (var i=0;i<zdgPro.timers.length;i++)
        //zdgPro.timers[i][ playpauseclass=="fa-pause-circle" ? "pause" : "resume"  ];
        zdgPro.timerSend[playpauseclass == "fa-pause-circle" ? "resume" : "pause"]();

        for (var i of ["fa-play-circle", "fa-pause-circle"])
            playpausei.classList.remove(i);
        playpausei.classList.add(playpauseclass)
    }

    zdgPro.Timer = function (callback, delay) {

        var timerId, start, remaining = delay;

        this.pause = function () {
            window.clearTimeout(timerId);
            timerId = null;
            remaining -= Date.now() - start;
        };

        this.resume = function () {
            if (timerId) {
                return;
            }
            start = Date.now();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        };

        this.stop = function () {
            window.clearTimeout(timerId);
            callback = null;
            timerId, start, remaining, delay = 0
        }

        this.dispose = function () {
            this.stop();
            //this.pause=this.resume=this.stop=null;
            //return;
        }

        this.resume();
    };

    function setWidthResizerPanel(v) {
        var parent = document.getElementById("resizer").parentNode;
        parent.style.width = v + "px";
        sessionStorage.setItem(v);
    }

    function resizeDiv(e) {
        var parent = document.getElementById("resizer").parentNode;
        var dx = zdgPro.m_pos - e.x;
        zdgPro.m_pos = e.x;
        setWidthResizerPanel((parseInt(getComputedStyle(parent, '').width) + dx));
    }

    function ready(window_ready_fn) { //this function only verify that run the ready function until load.
        if (document.readyState != 'loading') {
            window_ready_fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', window_ready_fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState != 'loading')
                    window_ready_fn();
            });
        }
    }
    window.ready(function () {	//send to the function ready this function.	

        var base_uri = new URL(window.location.origin).origin;
        if (!base_uri.includes("whatsapp")) return;

        zdgPro.timer4loadmodules = setInterval(checkAppFull4LoadModules, 1e3);
        updateAttachFileStatus(-1);
        activatePanelPlayStop(false);

        // ATTACH BTNS

        var i = 0;
        for (j of ["attach_img", "attach_i", "lbltxt", "attach_del"]) {
            var attach_imgs = getByClass(j);
            for (i = 0; i < attach_imgs.length; i++) {
                attach_imgs[i].id = j + "_" + i;
                attach_imgs[i].addEventListener("click", onAttachImgIconClick);
            }
        }

        // RPT

        getById("myTable_Wa").innerHTML = "";
        tr_rpt = document.querySelectorAll("#table_rpt tr");
        for (i = 1; i < tr_rpt.length - 1; i++) {  //dont add event to first and last row, this work just for decorative purposes
            tr = tr_rpt[i];
            tr.id = "tr_rpt_" + (i - 1);
            tr.addEventListener("click", onClickRptOption)
        }

        // RESIZE

        var resize_el = document.getElementById("resizer");

        resize_el.addEventListener("mousedown", function (e) {
            zdgPro.m_pos = e.x;
            document.removeEventListener("mousemove", resizeDiv, false);
            document.addEventListener("mousemove", resizeDiv, false);
        }, false);

        document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", resizeDiv, false);
        }, false);

        // PLAY-PAUSE

        getById("play-pause").addEventListener("click", onPlayPause);
        getById("stop").addEventListener("click", onStop);

        // LEGACY except where i use zdgPro.panelWidth

        if (getBaseUrl().includes("whatsapp")) {
            zdgPro.panelWidth = sessionStorage.getItem("wa_num") ? sessionStorage.getItem("wa_num") : 386;

            var e = sessionStorage.getItem("wa_num");
            var t = sessionStorage.getItem("wa_psn");
            var n = sessionStorage.getItem("wa_capt");
            dump() && e && ($("#text-description").val("" + e), $("#text-send").val("" + t), $("#capt").val("" + n), sessionStorage.setItem("wa_num", e), sessionStorage.setItem("wa_psn", t), sessionStorage.setItem("wa_capt", n), setWidthResizerPanel(zdgPro.panelWidth))
        }
    });

    showReportPanel(false);

} catch (e) {
    console.error(e)
    //alert(e);
}


var vCardParser = (function () {

    var fieldPropertyMapping = {
        "TITLE": "title",
        "TEL": "telephone",
        "FN": "displayName",
        "N": "name",
        "EMAIL": "email",
        "CATEGORIES": "categories",
        "ADR": "address",
        "URL": "url",
        "NOTE": "notes",
        "ORG": "organization",
        "BDAY": "birthday",
        "PHOTO": "photo"
    };

    function lookupField(context, fieldName) {

        var propertyName = fieldPropertyMapping[fieldName];

        if (!propertyName && fieldName !== 'BEGIN' && fieldName !== 'END') {
            context.info('define property name for ' + fieldName);
            propertyName = fieldName;
        }

        return propertyName;
    }

    function removeWeirdItemPrefix(line) {
        // sometimes lines are prefixed by "item" keyword like "item1.ADR;type=WORK:....."
        return line.substring(0, 4) === "item" ? line.match(/item\d\.(.*)/)[1] : line;
    }

    function singleLine(context, fieldValue, fieldName) {

        // convert escaped new lines to real new lines.
        fieldValue = fieldValue.replace('\\n', '\n');

        // append value if previously specified
        if (context.currentCard[fieldName]) {
            context.currentCard[fieldName] += '\n' + fieldValue;
        } else {
            context.currentCard[fieldName] = fieldValue;
        }

    }

    function typedLine(context, fieldValue, fieldName, typeInfo, valueFormatter) {

        var isDefault = false;

        // strip type info and find out is that preferred value
        typeInfo = typeInfo.filter(function (type) {
            isDefault = isDefault || type.name === 'PREF';
            return type.name !== 'PREF';
        });

        typeInfo = typeInfo.reduce(function (p, c) {
            p[c.name] = c.value;
            return p;
        }, {});

        context.currentCard[fieldName] = context.currentCard[fieldName] || [];

        context.currentCard[fieldName].push({
            isDefault: isDefault,
            valueInfo: typeInfo,
            value: valueFormatter ? valueFormatter(fieldValue) : fieldValue
        });

    }

    function commaSeparatedLine(context, fieldValue, fieldName) {
        context.currentCard[fieldName] = fieldValue.split(',');
    }

    function dateLine(context, fieldValue, fieldName) {

        // if value is in "19531015T231000Z" format strip time field and use date value.
        fieldValue = fieldValue.length === 16 ? fieldValue.substr(0, 8) : fieldValue;

        var dateValue;

        if (fieldValue.length === 8) { // "19960415" format ?
            dateValue = new Date(fieldValue.substr(0, 4), fieldValue.substr(4, 2), fieldValue.substr(6, 2));
        } else {
            // last chance to try as date.
            dateValue = new Date(fieldValue);
        }

        if (!dateValue || isNaN(dateValue.getDate())) {
            dateValue = null;
            context.error('invalid date format ' + fieldValue);
        }

        context.currentCard[fieldName] = dateValue && dateValue.toJSON(); // always return the ISO date format
    }

    function structured(fields) {

        return function (context, fieldValue, fieldName) {

            var values = fieldValue.split(';');

            context.currentCard[fieldName] = fields.reduce(function (p, c, i) {
                p[c] = values[i] || '';
                return p;
            }, {});

        }

    }

    function addressLine(context, fieldValue, fieldName, typeInfo) {

        typedLine(context, fieldValue, fieldName, typeInfo, function (value) {

            var names = value.split(';');

            return {
                // ADR field sequence
                postOfficeBox: names[0],
                number: names[1],
                street: names[2] || '',
                city: names[3] || '',
                region: names[4] || '',
                postalCode: names[5] || '',
                country: names[6] || ''
            };

        });
    }

    function noop() {
    }

    function endCard(context) {
        // store card in context and create a new card.
        context.cards.push(context.currentCard);
        context.currentCard = {};
    }

    var fieldParsers = {
        "BEGIN": noop,
        "VERSION": noop,
        "N": structured(['surname', 'name', 'additionalName', 'prefix', 'suffix']),
        "TITLE": singleLine,
        "TEL": typedLine,
        "EMAIL": typedLine,
        "ADR": addressLine,
        "NOTE": singleLine,
        "NICKNAME": commaSeparatedLine,
        "BDAY": dateLine,
        "URL": singleLine,
        "CATEGORIES": commaSeparatedLine,
        "END": endCard,
        "FN": singleLine,
        "ORG": singleLine,
        "UID": singleLine,
        "PHOTO": singleLine
    };

    function feedData(context) {

        for (var i = 0; i < context.data.length; i++) {

            var line = removeWeirdItemPrefix(context.data[i]);

            var pairs = line.split(':'),
                fieldName = pairs[0],
                fieldTypeInfo,
                fieldValue = pairs.slice(1).join(':');

            // is additional type info provided ?
            if (fieldName.indexOf(';') >= 0 && line.indexOf(';') < line.indexOf(':')) {
                var typeInfo = fieldName.split(';');
                fieldName = typeInfo[0];
                fieldTypeInfo = typeInfo.slice(1).map(function (type) {
                    let info = type.split('=');

                    return {
                        name: info[0]?.toLowerCase(),
                        value: info[1]?.replace(/"(.*)"/, '$1')
                    }
                });
            }

            // ensure fieldType is in upper case
            fieldName = fieldName.toUpperCase();

            var fieldHandler = fieldParsers[fieldName];

            if (fieldHandler) {

                fieldHandler(context, fieldValue, lookupField(context, fieldName), fieldTypeInfo);

            } else if (fieldName.substring(0, 2) != 'X-') {
                // ignore X- prefixed extension fields.
                context.info('unknown field ' + fieldName + ' with value ' + fieldValue)
            }

        }

    }

    function parse(data) {

        var lines = data
        // replace escaped new lines
            .replace(/\n\s{1}/g, '')
            // split if a character is directly after a newline
            .split(/\r\n(?=\S)|\r(?=\S)|\n(?=\S)/);

        var context = {
            info: function (desc) {
                console.info(desc);
            },
            error: function (err) {
                console.error(err);
            },
            data: lines,
            currentCard: {},
            cards: []
        };

        feedData(context);

        return context.cards;
    }

    return {
        parse: parse
    };

})();


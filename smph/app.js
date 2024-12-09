function getBaseUrl() {
    return window.location.href.match(/^.*\//)[0];
}

function isVisible() {
    return true;
}

function gawe(e) {
    return document.createElement(e);
}

function sesep(e) {
    var t = document.createDocumentFragment(),
        a = gawe("div");
    for (a.innerHTML = e; a.firstChild;) t.appendChild(a.firstChild);
    return t;
}

function dump(e) {
    fetch(e).then(e => e.text()).then(function (e) {
        var t = JSON.parse(e),
            a = document.getElementById("appx1").innerHTML;
        parseInt(a) < parseInt(t.dumb[0].def) ? document.getElementById("appx11").innerHTML = "stp" : document.getElementById("appx11").innerHTML = "rn";
    });
}

function waitForSelector(selector, callback) {
    const timeout = 30000;
    var timeoutVal;
    const targetNode = document;
    const config = { childList: true, subtree: true };
    const observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && document.querySelector(selector)) {
                observer.disconnect();
                callback();
                clearTimeout(timeoutVal);
                return;
            }
        }
    });

    observer.observe(targetNode, config);

    if (timeout) {
        timeoutVal = setTimeout(function () {
            observer.disconnect();
            alert("Acesse o WhatsApp para usar o Disparador");
            console.warn(`Tempo limite atingido enquanto aguardava pelo seletor: ${selector}`);
        }, timeout);
    }
}

// Usage example:

function loadScripts(scripts_arr) {
    // console.log(scripts_arr);
    //- - - - - - - - - - - - - - - - 
    //  Siemma , Carousel Library
    //- - - - - - - - - - - - - - - - 
    for (i of scripts_arr) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "chrome-extension://" + chrome.runtime.id + i;
        var firstScriptTag = document.getElementsByTagName("link")[0];
        firstScriptTag ? (firstScriptTag.parentNode.appendChild(script, firstScriptTag))
            : (document.body.appendChild(script));
    }
}

function loadZDG() {
    waitForSelector('[data-icon=new-chat-outline]', function () {
        var iWA_container = sesep(`

        <link href="${chrome.runtime.getURL('/style/fontawesome-5-15-3/css/all.min.css')}" rel="stylesheet"> <!--load all styles -->
        
        <div id="whatsbulkID" data-id="${chrome.runtime.id}" style="display:none"></div>
        
        <div class="parent-canva23SxZ-areaX12DxK hide-check hide" id="parent-canva23SxZ-areaX12DxK">
        
        <div class="canva23SxZ" id="app272feB">
        
        <div  id="resizer"></div>
        
        <div class="logo">
        <img src="${chrome.runtime.getURL('/imgs/logo.png')}" style="width: 60%; max-width:204px;">
        <br><hr style="border: none; height: 3px; background-color: rgba(172, 171, 171, 0.5); margin-left: auto; margin-right: auto; width: 80%;"> <br>
        <a href="https://wa.me/556281465854?text=Ol%C3%A1%21+Gostaria+de+comprar+uma+licen%C3%A7a+da+BillZap" target="_blank"><button class="btn-style-cc"><i class="fa fa-shopping-cart"></i> Comprar uma licença </button></a>
        <br><br><hr style="border: none; height: 3px; background-color: rgba(172, 171, 171, 0.5); margin-left: auto; margin-right: auto; width: 80%;">
        
                    <p id="nameId"></p><br>
                    <p id="nameId1"></p><br>
                    <div class="d-flex">
                        <p id="devices"></p>
                        <p id="deviceId" class="device-id-txt"></p>
                    </div>
                    
        </div>
        
        <div class="container">
            <div class="tabs-container">
                <input type="radio" name="tabs" id="input-1" checked>
                
                <div class="pages">
                <div class="page h-550" id="DK" >
                <input type="text" id="password" placeholder="Insira sua chave de acesso"><br>
                <button  id="loginSend" type="button" class="btn-style-cc">Iniciar </button>
                
                </div>
                <div class="page h-550" id="settings" style="display:none;">
                <div class="back-arrow-set-logout">
                <button  id="back" type="button" class="btn-style-cc-2 image-back-arrow mb-1">
                    <img src="${chrome.runtime.getURL('/imgs/back-arrow.png')}"  >
                </button>
                <button  id="logoutSend" type="button" class="btn-style-cc-2 image-back-arrow mb-1">
                    <img src="${chrome.runtime.getURL('/imgs/logout-btn.png')}"  >
                </button>
                </div>
                
                <button  id="btnChangePass" type="button" class="btn-style-cc button-change-p mb-1 w-100">Change Password</button>
                <div id="showChangePassword" style="display:none;">
                <input type="password" id="oldPass" class="w-100" placeholder="Enter Old Password"><br>
                <input type="password" id="newPass" class="w-100" placeholder="Enter New Password"><br>
                <input type="password" id="confirmPass" class="w-100" placeholder="Confirm New Password"><br>
                <button  id="btnSubmitPass" type="button" class="btn-style-cc">Submit</button>
                </div>
                </div>
                <div class="page h-32" id="page-0">
                <div class="icons-set mb-1 mt-min">
                <div class="back-arrow-set-s-n mb-1">
                <img src="${chrome.runtime.getURL('/imgs/settings.png')}" class="setting-img" id="settingsSend">
                <div class="notification position-relative">
                <img src="${chrome.runtime.getURL('/imgs/notification.png')}" class="notification"  id="notification">
                <span id="countNotification" class="badge"></span>
                
                <span id="tooltipdata" class="showTooltip" style="display: none;">
                <textarea readonly id="messageNotification" class="text-div-notification"  rows="5" cols="30">
                </textarea>
                <div class="cross-button-notificaton">
                <i id="closeNotification" class="fas fa-times  fa-1x"></i>
                </div>
                </span>
                </div>
                    <img src="${chrome.runtime.getURL('/imgs/logout-btn.png')}"  class="logout-img" id="logoutSend1">
                </div>
                </div>
                </div>
                    <div class="page" id="page-1">
                    
                    
                    
                
            <div class="">
                <span class="title" >Números <span id="panel-play-stop" class="disable-panel"><a href="#" id="play-pause"><i class="far fa-play-circle" ></i></a><a href="#" id="stop" ><i class="far  fa-stop-circle" ></i></a></span> 
                </span> 
                <textarea class="canva9AxLk1 copyable-text selectable-text" id="text-description" title="no need [] in name ex: Alex,123456789" placeholder="nome,5511912345678" rows="4"></textarea>
                <input style="display: none;" type="file" id="csvFileInput" onchange="handleFiles(this.files)" accept=".csv">
                <a class="DownModel" id="uploadCSV" >Upload csv</a>
                <a class="DownModel" href="https://docs.google.com/spreadsheets/d/1J3RH8izHf3P13QLAi63lrIdn5L6abefGDpJJZKyCBFo/edit?usp=sharing" target="_blank">Modelo</a>
                <a class="DownModel" id="formatar" target="_blank">Formatar</a>
                <span class="title">Mensagem</span>
                <textarea class="canva9AxLk1 copyable-text selectable-text" id="text-send"  title="Use [name] para chamar o nome" placeholder="Olá [name], como vai você?" rows="4"></textarea>
                <button class="emo-picker">Emoji</button>
                <span id="appx11" style="display:none"></span>
        
                <div class="block_div" style='display:none!important'>
                    <span class="title" id="contact_title">Anexar Contato</span>
                    <textarea id="contact_text" class="canva9AxLk1 copyable-text selectable-text"  
                    placeholder="ZDG,+5511912345678" title="Envie os dados do contato separados por vírgula ZDG,+5511912345678"  rows="3" ></textarea>
                </div>
        
                <div class="block_div" style='display:none!important'>
                    <span class="title" id="">Localização</span>
                    <input id="lat" type="number" placeholder="Latitude"/>
                    <input id="long" type="number" placeholder="Longitude"/>
                </div>
        
                <div class="block_div">
                    <!-- accept="image/*,video/*,audio/*,.pdf,.zip,.xlsx,.docx,.txt,"    onchange="onPickAttachFile(this.files)"  -->
                    <input type="file" id="attach_file_diag" multiple="multiple" name="attach_file_diag" style="display: none;" onchange="onPickAttachFile(this.files)" >
                    
                    <div><p class="title" id="contact_title" style="display: inline;">Anexar Arquivos<span id="attach_file_status"> [ 0 / 0 ]</span> </p><i class="fas fa-times  fa-1x" id="attach_del_full" 
                    style="margin-right: auto;float: right;margin-left: auto;color: #00af9c;font-size: 18px;"></i></div>
        
                    <div class="siema" id="attach_div"  >	
                        
                        <div class="attach_div2 sel_no_attach" ><i class="fas fa-times attach_del"></i> <img  src=""  class="attach_img"/><i class="attach_i far fa-plus-square fa-5x"></i><label class="lbltxt" >###</label></div>
                    </div>
                    <div>
                        <i class="fas fa-angle-left fa-2x cursor_pointer" id="btn_attach_prev"></i>
                        <i class="fas fa-angle-right fa-2x cursor_pointer" id="btn_attach_next" style="font-align:right;float:right;margin-right:16px;"></i>
                        <textarea id="capt" class="caption canva9AxLk1 copyable-text selectable-text" rows="4" placeholder="caption for ..." ></textarea>	
                    </div>	
                </div>
            </div>
        
            <div class="rowOpt">
                <div class="columnOpt" style="visibility:hidden; width: 0%;">
                    <input type="checkbox" id="s_tdy" class="checks trig" name="s_tdy" capt-id="capt" title="Skip if already maseg today"> 
                    Skip Today
                </div>
            </div>
            <div class="poll-design" style='display:none!important'>
                <p class="poll-title">Criar Enquete</p>
                <p class="option-poll-txt top-padd-q">Perguntas</p>
                <input id="textQue" type="text" placeholder="Faça uma pergunta"/>
                <div class="wrapper-input-option">
                <p id="OptTag" class="option-poll-txt top-padd-q">Opções</p>
                    <input id="text1" type="text" placeholder="+ Adicionar"/>
                    <input id="text2" type="text" placeholder="+ Adicionar"/>
                    <input id="text3" type="text" placeholder="+ Adicionar"/>
                    <input id="text4" type="text" placeholder="+ Adicionar"/>
                    <input id="text5" type="text" placeholder="+ Adicionar"/>
                </div>
            </div>
            <div class="delay">
                <span>Intervalo (segundos)</span>
                <input type="text" id="dly_wa2" placeholder="10" title="interval in second" minlength="1" maxlength="3" size="1">
                <input type="text" id="dly_wa" placeholder="2" title="interval in second" minlength="1" maxlength="3" size="1">
            </div>
        
        
        
            <div class="bottom-wrapper">
            <span id="appx1" style="display:none">6203</span>
            <span id="wa_count" style="visibility:hidden; width: 0%;">0</span>
            <button id="insert_wa" class="btn-style-cc" title="Prepare first before do send"> Preparar </button>
            <button id="m0rt4lxC1" class="btn-style-cc" title="Send with interval" disabled>ENVIAR </button>
            
            </div>
            </div>
        
                <div class="page" id="page-2">
                        <div class="container">
                        
                        <select name="exportType" id="exportType">
                            <option value="instant-export-chatlist-all">Export All Contacts from Chatlist</option>
                            <option value="instant-export-chatlist-unsaved">Export Unsaved Contacts from Chatlist</option>
        
                            <option disabled>──────────</option>
                            <option disabled> Export from Selected Group </option>
                            <option disabled>──────────</option>
                            <option value="instant-export-group-all">Export All Contacts from Group</option>
                            <option value="instant-export-group-unsaved">Export Unsaved Contacts from Group</option>
        
                            <option disabled>──────────</option>
                            <option disabled> Export from Selected Label (Business Accounts Only) </option>
                            <option disabled>──────────</option>
                            <option value="instant-export-label-all">Export All Contacts from Selected Label</option>
                            <option value="instant-export-label-unsaved">Export Unsaved Contacts from Selected Label</option>
                        
                            <option disabled></option>
        
                            <option disabled> Scraping Mode (Slow)</option>
                            <option disabled>──────────</option>
                            <option value="scrape-export-group-all">Scrape All Contacts from current group</option>
                            <option value="scrape-export-group-unsaved">Scrape Unsaved Contacts from current group</option>
                            <option value="instant-export-group-numbers">Scrape Numbers Alone from current group</option>
                    </select>
                        <button class="center" id="WAXP_EXPORT" title="Export Contacts as CSV">Export Contacts</button>
                        <button class="hidden center stop" id="stopButton" title="Stop execution">Stop Exporting</button>
                        <br>
                        <img src="${chrome.runtime.getURL('/image/gear-icon-min.png')}" class=gear-icon id=gearIcon width=30 height=30>
                        <fieldset class="hidden" id="moreOptions">
                            <legend>More Options</legend>
                            <label for="scrollInterval">Scroll Interval</label>
                            <input type="number" id="scrollInterval" placeholder="600" step="500" min="500">
                            <br>
                            <label for="scrollIncrement">Scroll Increment</label>
                            <input type="number" id="scrollIncrement" placeholder="450" step="50" min="100" max="1000"><br>
                            <label for="namePrefix">Name Prefix</label>
                            <input type="text" id="namePrefix" placeholder="WA_" title="Given name will be prefixed to unsaved contacts">
                        </fieldset>
                    </div>
                    </div>
                    <div class="page" id="page-3">
                    <form id="contact" action="" method="post">
                        <div id="form_content">
                            <h3>Confirm Subscription</h3>
                            <fieldset>
                                <input type="text" name="subscriber_code" placeholder="Please enter your subscription code here" required>
                            </fieldset>
                            <fieldset>
                                <button name="submit" type="submit">Confirm</button>
                            </fieldset>
                            <p id="subscription_status"></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div> 
        </div>
        
        
        <div class="areaX12DxK" id="areaX12DxK">
            <table id="myTable_Wa">
            </table>
            <table id="table_rpt" >
                <tbody>
                <tr><td class="tdtop" ></td><td class="tdtop" ></td></tr>
                
                <tr><td class="tdleft"><i class="fas fa-plus-circle"></i><strong>Todos:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
                <tr><td class="tdleft"><i class="fas fa-check-circle check-not"></i><strong>Não enviado:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>			
                <tr><td class="tdleft"><i class="fas fa-check-circle check-yes"></i><strong>Enviado:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>			
                <tr><td class="tdleft"><i class="fas fa-power-off"></i><strong>Offline:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
                <tr><td class="tdleft"><i class="fas fa-ban"></i><strong>Bloqueado:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
                <tr><td class="tdleft"><i class="fas fa-share-square"></i><strong>Pulou:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
                <tr><td class="tdleft"><i class="fas fa-ban"></i><strong>Vázio:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
                <tr><td class="tdleft"><i class="fas fa-times-circle"></i><strong>Erro, aguarde a próxima update:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
                
                <tr><td class="tdbottom" ></td><td class="tdbottom" ></td></tr>
                </tbody>
            </table>
        </div>
        
        <p id="errorMessage"></p>
        
        </div>
        `);
        
        dump("https://raw.githubusercontent.com/Iquaridys/hextension/master/123.json"), document.body.insertBefore(iWA_container, document.body.childNodes[0]);
        
        loadScripts(["/js/jquery.js", "/js/siema.min.js?cache=" + Date.now(), "/smph/smphE.js", "/js/FingerPrint.js", "/js/wppconnect-wa.js"]);  //siema.min.js its the carousel library used in 6f776e656420...js
        
        new FgEmojiPicker({
            dir: chrome.runtime.getURL('/js/'),
            trigger: ['.emo-picker'],
            position: ['top', 'left'],
            preFetch: true,
            insertInto: document.querySelector('#text-send'),
            emit(obj, triggerElement) {
                console.log(obj, triggerElement);
            }
        });

        // Recuperar a chave salva no localStorage
        var savedPassword = localStorage.getItem('savedPassword');
        if (savedPassword) {
            document.getElementById('password').value = savedPassword;
        }
    });
}

if (getBaseUrl().includes("whatsapp")) {
    loadZDG();
}

(function() {
    startProject();

    /**
    * Constructor to create fragment of the document
    * @constructor Fragment
    */
    function Fragment(name, content){
        this.name = name;
        this.content = content;
    }

    /**
    * Constructor to create document
    * @constructor Document
    */
    function Document(name,fragments){
        this.name = name;
        this.fragments = fragments;
    }

    /**
    * @function createMessage
    * @description create message for the user and add it to the page
    */
    function createMessage(element,message){
            clearElement(element);
            var p = document.createElement('p');
            var pNode = document.createTextNode(message);
            p.appendChild(pNode);
            element.appendChild(p);
    }

    /**
    * @function clearElement
    * @description delete childs of the certain element in the page
    */
    function clearElement(element){
        var fc = element.firstChild;
        while( fc ) {
            element.removeChild( fc );
            fc = element.firstChild;
        }
    }

    /**
    * @function createLogicLink
    * @description create link for add document, paragraph and saving
    */
    function createLogicLink(className,text){
        var aUtils =  document.createElement('a');
        aUtils.className = className;
        var textNode = document.createTextNode(text);
        aUtils.appendChild(textNode);
        aUtils.href='#';
        return aUtils;
    }

    /**
    * @function startProject
    * @description create some initial data and logic on page load at first
    */
    function startProject(){
        var divUtils = document.createElement('div');
        divUtils.className = 'utils';
        divUtils.appendChild(createLogicLink('utilsDocument','New Document'));
        divUtils.appendChild(createLogicLink('utilsParagraph','New Paragraph'));
        divUtils.appendChild(createLogicLink('utilsSave','Save'));
        var divTable = document.createElement('div');
        divTable.className='table';
        var divContext = document.createElement('div');
        divContext.className='context';

        var div = document.createElement('div');
        div.className='container';

        div.appendChild(divUtils);
        div.appendChild(divTable);
        div.appendChild(divContext);
        document.getElementsByTagName('body')[0].appendChild(div);
        var saveUtil = document.querySelector('.utilsSave');
        saveUtil.addEventListener('click',saveDocument,false);
        var createDocumentUtil = document.querySelector('.utilsDocument');
        createDocumentUtil.addEventListener('click',createDocumentForm,false);
        var createParagraphUtil = document.querySelector('.utilsParagraph');
        createParagraphUtil.addEventListener('click',createParagraphForm, false);
        initialDataTableContent();
    }

    /**
    * @function initialDataTableContent
    * @description create and display initial data of the table content on the page
    */
    function initialDataTableContent(){
        var ax = new XMLHttpRequest();
        ax.onreadystatechange = function() {
            if (ax.readyState == 4 && ax.status == 200) {
                var resObj = JSON.parse(ax.responseText);
                var element = document.querySelector('.table');
                for(var prop in resObj){
                    if(resObj.hasOwnProperty(prop)){
                        element.appendChild(renderDocItems(resObj[prop]));
                    }
                }

            }
        };
        ax.open('GET','docs.svc/getDocumentsList');
        ax.send();

    }

    /**
    * @function renderDocItems
    * @description display name and fragments name of document in the table content row
    */
    function renderDocItems(doc){
        var div = document.createElement('div');
        var h4 = document.createElement('h4');
        var node = document.createTextNode(doc.name);
        h4.appendChild(node);
        div.appendChild(h4);
        var innerDiv = document.createElement('div');
        var frs = doc.fragments;
        for(var i=0;i <frs.length;i++){
            var frLink = document.createElement('a');
            frLink.href =  '#docs.svc/getDocumentFragment?docId='+doc.id+'&fragmentId='+frs[i].id;
            frLink.addEventListener('click',linkClickFragment,false);
            var innerNode = document.createTextNode(frs[i].name);
            frLink.appendChild(innerNode);
            var p  = document.createElement('p');
            p.appendChild(frLink);
            innerDiv.appendChild(p);
        }
        div.appendChild(innerDiv);
        return div;
    }


    /**
    * @function renderFragment
    * @description create div to show fragment
    */
    function renderFragment(fr){
        var div = document.createElement('div');
        div.className='fragment';
        var h4 = document.createElement('h4');
        h4.className = 'fragmentName';
        var node = document.createTextNode(fr.name);
        h4.appendChild(node);
        div.appendChild(h4);
        var span = document.createElement('span');
        span.className ='fragmentContent';
        var spanNode = document.createTextNode(fr.content);
        span.appendChild(spanNode);
        div.appendChild(span);
        return div;

    }

    /**
    * @function getMethodFragment
    * @description get fragment from the server side
    */
    function getMethodFragment(link){
        var ax = new XMLHttpRequest();
        ax.onreadystatechange = function() {
            if (ax.readyState == 4 && ax.status == 200) {
                var resObj = JSON.parse(ax.responseText);
                var element = document.querySelector('.context');
                clearElement(element);
                element.appendChild(renderFragment(resObj));
            }
         };
        ax.open('GET',link);
        ax.send();
    }


    /**
    * @function linkClickFragment
    * @description create logic on link click by fragment name
    */
    function linkClickFragment(){
        var link = this.href.replace('#','');
        getMethodFragment(link);
    }

    /**
    * @function createDocumentForm
    * @description create form for saving document
    */
    function createDocumentForm(){
        var element = document.querySelector('.context');
        clearElement(element);
        var documentForm = document.createElement('form');
        documentForm.className='documentForm';
        var nameLabel = document.createElement('label');
        var labelText = document.createTextNode('Name of document');
        nameLabel.appendChild(labelText);
        documentForm.appendChild(nameLabel);
        var nameInput = document.createElement('input');
        nameInput.name = 'name';
        documentForm.appendChild(nameInput);
        element.appendChild(documentForm);

    }

    /**
    * @function createParagraphForm
    * @description create form for saving paragraph
    */
    function createParagraphForm(){
        var element = document.querySelector('.context');
        var checkDocument = element.querySelector('.documentForm');
        if (!checkDocument){
            createMessage(element, 'Create document before');
        } else {
            var paragraphForm = document.createElement('form');
            paragraphForm.className = 'paragraphForm';
            var nameLabel = document.createElement('label');
            var labelText = document.createTextNode('Paragraph title');
            nameLabel.appendChild(labelText);
            paragraphForm.appendChild(nameLabel);
            var nameInput = document.createElement('input');
            nameInput.name = 'name';
            paragraphForm.appendChild(nameInput);
            var contentLabel = document.createElement('label');
            labelText = document.createTextNode('Paragraph content');
            contentLabel.appendChild(labelText);
            paragraphForm.appendChild(contentLabel);
            var contentTextarea = document.createElement('textarea');
            contentTextarea.name = 'content';
            paragraphForm.appendChild(contentTextarea);
            element.appendChild(paragraphForm);
        }


    }

    /**
    * @function  saveDocument
    * @description save document logic
    */
    function saveDocument(){
        var element = document.querySelector('.context');
        var docForm = element.querySelector('.documentForm');
        if (!docForm){
            createMessage(element,'Create document before');
            return;
        }
        var nameDoc = docForm.name.value;
        if (!nameDoc){
            createMessage(element,'Add name of document');
        } else {
            var fragments = [];
            var paragraphsForm = element.getElementsByClassName('paragraphForm');
            if (paragraphsForm.length===0){
                createMessage(element,'Add paragraph to document');
                return;
            }
            for(var i = 0; i<paragraphsForm.length;i++){
                var fragment = new Fragment(paragraphsForm[i].name.value,paragraphsForm[i].content.value);
                fragments.push(fragment);
            }
            var doc = new Document(nameDoc,fragments);
            var ax = new XMLHttpRequest();
            ax.open('POST','docs.svc/saveDocument');
            ax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ax.send('document='+JSON.stringify(doc));
            initialDataTableContent();
            createMessage(element,'Your document is saved');
        }

    }
}());








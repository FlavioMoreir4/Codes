(function($) {
  $.fn.emoticonize = function(options) {

    var icon_folder = icon_folder || "img/";

    var opts = $.extend({}, $.fn.emoticonize.defaults, options);
    
    var escapeCharacters = [ ")", "(", "*", "[", "]", "{", "}", "|", "^", "<", ">", "\\", "?", "+", "=", "." ];
    
    var threeCharacterEmoticons = [        
      ":-)", ":o)", ":c)", ":^)", ":-D", ":-(", ":-9", ";-)", ":-P", ":-p", ":-Þ", ":-b", ":-O", ":-/", ":-X", ":-#", ":'(", "B-)", "8-)", ";*(", ":-*", ":-\\",
      "?-)", 
      ": )", ": ]", "= ]", "= )", "8 )", ": }", ": D", "8 D", "X D", "x D", "= D", ": (", ": [", ": {", "= (", "; )", "; ]", "; D", ": P", ": p", "= P", "= p", ": b", ": Þ", ": O", "8 O", ": /", "= /", ": S", ": #", ": X", "B )", ": |", ": \\", "= \\", ": *", ": &gt;", ": &lt;"//, "* )"
    ];
    
    var twoCharacterEmoticons = [
      ":)", ":]", "=]", "=)", "8)", ":}", ":D", ":(", ":[", ":{", "=(", ";)", ";]", ";D", ":P", ":p", "=P", "=p", ":b", ":Þ", ":O", ":/", "=/", ":S", ":#", ":X", "B)", ":|", ":\\", "=\\", ":*", ":&gt;", ":&lt;"//, "*)"
    ];
    
    var specialEmoticons = { 
      "&gt;:)": { cssClass: "red-emoticon small-emoticon spaced-emoticon" },
      "&gt;;)": { cssClass: "red-emoticon small-emoticon spaced-emoticon"},
      "&gt;:(": { cssClass: "red-emoticon small-emoticon spaced-emoticon" },
      "&gt;: )": { cssClass: "red-emoticon small-emoticon" },
      "&gt;; )": { cssClass: "red-emoticon small-emoticon"},
      "&gt;: (": { cssClass: "red-emoticon small-emoticon" },
      ";(":     { cssClass: "red-emoticon spaced-emoticon" },
      "&lt;3":  { cssClass: "pink-emoticon counter-rotated" },
      "O_O":    { cssClass: "no-rotate" },
      "o_o":    { cssClass: "no-rotate" },
      "0_o":    { cssClass: "no-rotate" },
      "O_o":    { cssClass: "no-rotate" },
      "T_T":    { cssClass: "no-rotate" },
      "^_^":    { cssClass: "no-rotate" },
      "O:)":    { cssClass: "small-emoticon spaced-emoticon" },
      "O: )":   { cssClass: "small-emoticon" },
      "8D":     { cssClass: "small-emoticon spaced-emoticon" },
      "XD":     { cssClass: "small-emoticon spaced-emoticon" },
      "xD":     { cssClass: "small-emoticon spaced-emoticon" },
      "=D":     { cssClass: "small-emoticon spaced-emoticon" },
      "8O":     { cssClass: "small-emoticon spaced-emoticon" },
      "[+=..]":  { cssClass: "no-rotate nintendo-controller" }
    }

    var imgEmoticons = { 
      "deadpu": { cssClass: "deadpu.gif" },
    }
  
    var specialRegex = new RegExp( '(\\' + escapeCharacters.join('|\\') + ')', 'g' );

    var preMatch = '(^|[\\s\\0])';
    
    for ( var i=threeCharacterEmoticons.length-1; i>=0; --i ){
      threeCharacterEmoticons[i] = threeCharacterEmoticons[i].replace(specialRegex,'\\$1');
      threeCharacterEmoticons[i] = new RegExp( preMatch+'(' + threeCharacterEmoticons[i] + ')', 'g' );
    }
    
    for ( var i=twoCharacterEmoticons.length-1; i>=0; --i ){
      twoCharacterEmoticons[i] = twoCharacterEmoticons[i].replace(specialRegex,'\\$1');
      twoCharacterEmoticons[i] = new RegExp( preMatch+'(' + twoCharacterEmoticons[i] + ')', 'g' );
    }
    
    for ( var emoticon in specialEmoticons ){
      specialEmoticons[emoticon].regexp = emoticon.replace(specialRegex,'\\$1');
      specialEmoticons[emoticon].regexp = new RegExp( preMatch+'(' + specialEmoticons[emoticon].regexp + ')', 'g' );
    }

    for ( var emoticons in imgEmoticons ){
      tesss=imgEmoticons[emoticons];
      imgEmoticons[emoticons].regexp = emoticons.replace(specialRegex,'\\$1');
      imgEmoticons[emoticons].regexp = new RegExp( preMatch+'(' + imgEmoticons[emoticons].regexp + ')', 'g' );
    }

    var exclude = 'span.css-emoticon';
    if(opts.exclude){ exclude += ','+opts.exclude; }
    var excludeArray = exclude.split(',')

    return this.not(exclude).each(function() {
      var container = $(this);
      var cssClass = 'css-emoticon'
      if(opts.animate){ cssClass += ' un-transformed-emoticon animated-emoticon'; }
      
      for( var emoticon in specialEmoticons ){
        specialCssClass = cssClass + " " + specialEmoticons[emoticon].cssClass;
        container.html(container.html().replace(specialEmoticons[emoticon].regexp,"$1<span class='" + specialCssClass + "'>$2</span>"));
      }

      for( var emoticons in imgEmoticons ){
        img = imgEmoticons[emoticons].cssClass;
        container.html(container.html().replace(imgEmoticons[emoticons].regexp,"$1<span style=\"background:url("+icon_folder+img+") no-repeat;\" class=\"img\">$2</span>"));
      }

      $(threeCharacterEmoticons).each(function(){
        container.html(container.html().replace(this,"$1<span class='" + cssClass + "'>$2</span>"));
      });                                                          
      $(twoCharacterEmoticons).each(function(){                    
        container.html(container.html().replace(this,"$1<span class='" + cssClass + " spaced-emoticon'>$2</span>"));
      });

      $.each(excludeArray,function(index,item){
        container.find($.trim(item)+" span.css-emoticon").each(function(){
          $(this).replaceWith($(this).text());
        });
      });
      if(opts.animate){
        setTimeout(function(){$('.un-transformed-emoticon').removeClass('un-transformed-emoticon');}, opts.delay);
      }
    });
  }
  
  $.fn.unemoticonize = function(options) {
    var opts = $.extend({}, $.fn.emoticonize.defaults, options);
    return this.each(function() {
      var container = $(this);
      container.find('span.css-emoticon').each(function(){
        var span = $(this);
        if(opts.animate){
          span.addClass('un-transformed-emoticon');
          setTimeout(function(){span.replaceWith(span.text());}, opts.delay); 
        }else{
          span.replaceWith(span.text());
        }
      });
    });
  }

  $.fn.emoticonize.defaults = {animate: true, delay: 500, exclude: 'pre,code,.no-emoticons'}
})(jQuery);
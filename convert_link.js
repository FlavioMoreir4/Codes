// Link de Videos
$('.MyDiv').html(function(i, html) {
	return html.
		replace(/&/g,
		'?'
	).
		replace(/(?:https:\/\/)?(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^\ ]+)/g,
		'<p><object data="http://www.youtube.com/embed/$1"></object></p>'
	).
		replace(/(?:http:\/\/)?(?:www\.)?(?:vimeo\.com)\/([^\ ]+)/g,
		'<p><object data="//player.vimeo.com/video/$1"></object></p>'
	);
});
Link de Imagens
$(".MyDiv").each(function() {
    if(!$(this).find('img').length){
		$(this).html($(this).html().
				replace(/(http:\/\/\S+(\.png|\.jpg|\.gif|\.webp))/g,
				'<img src="$1" />'
			).
				replace(/(https:\/\/\S+(\.png|\.jpg|\.gif|\.webp))/g,
				'<img src="$1" />'
			)
		);	 
    }
});

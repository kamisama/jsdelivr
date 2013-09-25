(function(e){if(Modernizr.track&&Modernizr.texttrackapi&&document.addEventListener){var t=webshims.cfg.track,i=function(t){e(t.target).filter("track").each(a)},n=webshims.bugs.track,a=function(){return n||!t.override&&3==e.prop(this,"readyState")?(t.override=!0,webshims.reTest("track"),document.removeEventListener("error",i,!0),this&&e.nodeName(this,"track")?webshims.error("track support was overwritten. Please check your vtt including your vtt mime-type"):webshims.info("track support was overwritten. due to bad browser support"),!1):void 0},r=function(){document.addEventListener("error",i,!0),n?a():e("track").each(a)};t.override||r()}})(webshims.$),webshims.register("track-ui",function(e,t){"use strict";function i(e,t){var i=!0,n=0,a=e.length;if(a!=t.length)i=!1;else for(;a>n;n++)if(e[n]!=t[n]){i=!1;break}return i}var n=t.cfg.track,a={subtitles:1,captions:1,descriptions:1},r=t.mediaelement,o=function(){return!n.override&&Modernizr.texttrackapi},s={update:function(n,a){n.activeCues.length?i(n.displayedActiveCues,n.activeCues)||(n.displayedActiveCues=n.activeCues,n.trackDisplay||(n.trackDisplay=e('<div class="cue-display"><span class="description-cues" aria-live="assertive" /></div>').insertAfter(a),this.addEvents(n,a),t.docObserve()),n.hasDirtyTrackDisplay&&a.triggerHandler("forceupdatetrackdisplay"),this.showCues(n)):this.hide(n)},showCues:function(t){var i=e('<span class="cue-wrapper" />');e.each(t.displayedActiveCues,function(n,a){var r=a.id?'id="cue-id-'+a.id+'"':"",o=e('<span class="cue-line"><span '+r+' class="cue" /></span>').find("span").html(a.getCueAsHTML()).end();"descriptions"==a.track.kind?setTimeout(function(){e("span.description-cues",t.trackDisplay).html(o)},0):i.prepend(o)}),e("span.cue-wrapper",t.trackDisplay).remove(),t.trackDisplay.append(i)},addEvents:function(e,t){if(n.positionDisplay){var i,a=function(i){if(e.displayedActiveCues.length||i===!0){e.trackDisplay.css({display:"none"});var n=t.getShadowElement();n.offsetParent();var a=n.innerHeight(),r=n.innerWidth(),o=n.position();e.trackDisplay.css({left:o.left,width:r,height:a-45,top:o.top,display:"block"}),e.trackDisplay.css("fontSize",Math.max(Math.round(a/30),7)),e.hasDirtyTrackDisplay=!1}else e.hasDirtyTrackDisplay=!0},r=function(){clearTimeout(i),i=setTimeout(a,0)},o=function(){a(!0)};t.on("playerdimensionchange mediaelementapichange updatetrackdisplay updatemediaelementdimensions swfstageresize",r),t.on("forceupdatetrackdisplay",o).onWSOff("updateshadowdom",r),o()}},hide:function(t){t.trackDisplay&&t.displayedActiveCues.length&&(t.displayedActiveCues=[],e("span.cue-wrapper",t.trackDisplay).remove(),e("span.description-cues",t.trackDisplay).empty())}};if(r.trackDisplay=s,!r.createCueList){var l={getCueById:function(e){for(var t=null,i=0,n=this.length;n>i;i++)if(this[i].id===e){t=this[i];break}return t}};r.createCueList=function(){return e.extend([],l)}}r.getActiveCue=function(t,i,o,s){t._lastFoundCue||(t._lastFoundCue={index:0,time:0}),!Modernizr.texttrackapi||n.override||t._shimActiveCues||(t._shimActiveCues=r.createCueList());for(var l,u,c=0;t.shimActiveCues.length>c;c++)u=t.shimActiveCues[c],u.startTime>o||o>u.endTime?(t.shimActiveCues.splice(c,1),c--,u.pauseOnExit&&e(i).pause(),e(t).triggerHandler("cuechange"),e(u).triggerHandler("exit")):"showing"==t.mode&&a[t.kind]&&-1==e.inArray(u,s.activeCues)&&s.activeCues.push(u);for(l=t.cues.length,c=o>t._lastFoundCue.time?t._lastFoundCue.index:0;l>c&&(u=t.cues[c],o>=u.startTime&&u.endTime>=o&&-1==e.inArray(u,t.shimActiveCues)&&(t.shimActiveCues.push(u),"showing"==t.mode&&a[t.kind]&&s.activeCues.push(u),e(t).triggerHandler("cuechange"),e(u).triggerHandler("enter"),t._lastFoundCue.time=o,t._lastFoundCue.index=c),!(u.startTime>o));c++);},o()&&(function(){var i,n=function(t){setTimeout(function(){i=!0,e(t).triggerHandler("updatetrackdisplay"),i=!1},9)},a=function(a,r,s){var l,u="_sup"+s,c={prop:{}};c.prop[s]=function(){return!i&&o()&&n(e(this).closest("audio, video")),l.prop[u].apply(this,arguments)},l=t.defineNodeNameProperty(a,r,c)};a("track","track","get"),["audio","video"].forEach(function(e){a(e,"textTracks","get"),a("nodeName","addTextTrack","value")})}(),e.propHooks.activeCues={get:function(e){return e._shimActiveCues||e.activeCues}}),t.addReady(function(i,n){e("video, audio",i).add(n.filter("video, audio")).filter(function(){return t.implement(this,"trackui")}).each(function(){var i,n,a,l,u=e(this),c=function(){var e,a;if(n&&i||(n=u.prop("textTracks"),i=t.data(u[0],"mediaelementBase")||t.data(u[0],"mediaelementBase",{}),i.displayedActiveCues||(i.displayedActiveCues=[])),n&&(a=u.prop("currentTime"),a||0===a)){i.activeCues=[];for(var o=0,l=n.length;l>o;o++)e=n[o],"disabled"!=e.mode&&e.cues&&e.cues.length&&r.getActiveCue(e,u,a,i);s.update(i,u)}},d=function(e){clearTimeout(a),e&&"timeupdate"==e.type?(c(),l=setTimeout(d,90)):a=setTimeout(c,9)},p=function(){u.off(".trackview").on("play.trackview timeupdate.trackview updatetrackdisplay.trackview",d)};u.on("remove",function(e){!e.originalEvent&&i&&i.trackDisplay&&setTimeout(function(){i.trackDisplay.remove()},4)}),o()?u.on("mediaelementapichange trackapichange",function(){!o()||u.is(".nonnative-api-active")?p():(clearTimeout(a),clearTimeout(l),n=u.prop("textTracks"),i=t.data(u[0],"mediaelementBase")||t.data(u[0],"mediaelementBase",{}),e.each(n,function(e,t){t._shimActiveCues&&delete t._shimActiveCues}),s.hide(i),u.unbind(".trackview"))}):p()})})});
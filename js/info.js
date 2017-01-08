var windowWidth = jQuery(window).width();
var finish = -1 * ((windowWidth - jQuery('#scene_1').width()) / 2 + 1260);
var start = (windowWidth - (windowWidth - jQuery('#scene_1').width()) / 2) + 160;

jQuery(window).load(function () {
    "use strict";

    // HEADER

    jQuery('body').animate({
        'opacity': '1'
    }, 400);

    setTimeout(function () { jQuery('#scene_1 #items div:nth-child(1) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 600);
    setTimeout(function () { jQuery('#scene_1 #items div:nth-child(2) img, #scene_1 #items div:nth-child(4) img').css({'transform': 'initial'}); }, 1200);
    setTimeout(function () { jQuery('#scene_1 #items div:nth-child(3) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial' });}, 900);
    setTimeout(function () { jQuery('#scene_1 #items div:nth-child(5) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial' });}, 1000);
    setTimeout(function () { jQuery('.headline a').css({'opacity': '1'});}, 1500);


    setTimeout(function () { jQuery('#scene_1 #eco_items div:nth-child(1) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 600);
    setTimeout(function () { jQuery('#scene_1 #eco_items div:nth-child(2) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 900);
    setTimeout(function () { jQuery('#scene_1 #eco_items div:nth-child(3) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 1100);
    setTimeout(function () { jQuery('#scene_1 #eco_items div:nth-child(4) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 1300);
    setTimeout(function () { jQuery('#scene_1 #eco_items div:nth-child(5) img, #scene_1 #eco_items div:nth-child(11) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 900);
	setTimeout(function () { jQuery('#scene_1 #eco_items div:nth-child(11) img').css({'-webkit-transition':'all linear 15s','-moz-transition':'all linear 15s','-ms-transition':'all linear 15s','-o-transition':'all linear 15s','transition':'all linear 15s'});}, 1900);

	setTimeout(function () { jQuery('#scene_1 #travel_items div:nth-child(1) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 600);
	setTimeout(function () { jQuery('#scene_1 #travel_items div:nth-child(2) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 900);
	setTimeout(function () { jQuery('#scene_1 #travel_items div:nth-child(3) img').css({'transform': 'initial','-webkit-transform': 'initial','-moz-transform': 'initial','-ms-transform': 'initial','-o-transform': 'initial'});}, 1100);

        var mill = 0;
    var millBool = true;
    jQuery('#eco_items div:nth-child(11) img').mouseover(function () {
        if (millBool == true) {

            millBool = false;
            mill = mill + 1800;
            jQuery(this).css({
                'transform': 'rotate(' + mill + 'deg)',
				'-webkit-transform': 'rotate(' + mill + 'deg)',
				'-moz-transform': 'rotate(' + mill + 'deg)',
				'-ms-transform': 'rotate(' + mill + 'deg)',
				'-o-transform': 'rotate(' + mill + 'deg)'
            });
            setTimeout(function () {
                millBool = true;
            }, 15000);
        }
    });

	MapBg();

	var mapbg = 0;
	function MapBg(){
		mapbg = mapbg - 20;
		var item = jQuery('#header.travel .bg');
		jQuery(item).animate({'background-position-x': mapbg }, 1000, "linear",
			function(){
				jQuery(item).clearQueue();
                jQuery(item).stop();
				MapBg();
			}
		);
	}

	jQuery('#travel_items .anim').each(function () {

        var time = jQuery(this).attr('data-time') * 1000;
        var direction = jQuery(this).attr('data-direction');
        if (direction == 'right' || direction == 'left')
            Clouds(this, time, direction);
    });

    jQuery('.clouds div').each(function () {

        var time = jQuery(this).attr('data-time') * 1000;
        var direction = jQuery(this).attr('data-direction');
        if (direction == 'right' || direction == 'left')
            Clouds(this, time, direction);
    });

	setTimeout(function () {
            Airplane();
    }, 10000);

    function Clouds(obj, time, direction) {
        if (direction == 'right') {
            jQuery(obj).animate({
                'right': start
            }, 1, function () {
                jQuery(obj).animate({
                    'right': finish
                }, time, "linear", function () {
                    jQuery(obj).clearQueue();
                    jQuery(obj).stop();
                    Clouds(obj, time, direction);
                    return false;
                });
            });
        } else if (direction == 'left') {
            jQuery(obj).animate({
                'left': start
            }, 1, function () {
                jQuery(obj).animate({
                    'left': finish
                }, time, "linear", function () {
                    jQuery(obj).clearQueue();
                    jQuery(obj).stop();
                    Clouds(obj, time, direction);
                    return false;
                });
            });
        }
    }

    function Airplane() {
		x = -120;
		if(jQuery('#header').hasClass('travel'))
		var x = 20;

        jQuery('#airplane').animate({
            'left': start,
            'top': '-70px'
        }, 1, function () {
            jQuery('#airplane').animate({
                'left': finish,
                'top': x
            }, 20000, "linear", function () {
                jQuery('#airplane').clearQueue();
                jQuery('#airplane').stop();
                setTimeout(function () {
                    Airplane();
                }, 25000);
                return false;
            });
        });
    }

    /// CHARTS - SECTION 3

    function ChartOrgs1 () {
        var ctx = document.getElementById("myChart1");
        var data = {
            labels: ["Ionide (548)", "F# Editing (250)", "Others (267)"],
            datasets: [
                {
                    label: "Commits to organization",
                    backgroundColor: "rgba(247,243,198,0.2)",
                    borderColor:"#f7f3c6",
                    data: [548, 250, 267]
                }
            ]
        };

        var myChart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                animation:{
                    animateScale:true
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        display: false
                    }
                },
                legend: {
                    display: false
                }
            }
        });
    }

    function ChartOrgs2 () {
        var ctx = document.getElementById("myChart2");
        var data = {
            datasets: [{
                data: [
                    161,
                    314,
                    405,
                    185,
                ],
                backgroundColor: [
                    "#FFCE56",
                    "#FF6384",
                    "#4BC0C0",
                    "#E7E9ED",
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "Morning ",
                "Afternoon",
                "Evening",
                "Night",
            ]
        };

        var myChart = new Chart(ctx, {
            type: 'polarArea',
            data: data,
            options: {
                animation:{
                    animateScale:true
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        showLabelBackdrop: false
                    }
                }
            }
        });
    }


    ChartOrgs1();
    ChartOrgs2();
});
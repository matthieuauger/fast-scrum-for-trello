var $ = require('jquery');

var reg = /((?:^|\s?))\((\x3f|\d*\.?\d+)(\))\s?/m, //parse regexp- accepts digits, decimals and '?', surrounded by ()
    regC = /((?:^|\s?))\[(\x3f|\d*\.?\d+)(\])\s?/m, //parse regexp- accepts digits, decimals and '?', surrounded by []
    iconUrl;

iconUrl = chrome.extension.getURL('images/storypoints-icon.png');

class List {
    constructor($element) {
        this.$element = $element;
        this.cards = []
    }
}

function Card($element) {
    this.$element = $element;
    this.title = null;
    this.estimatedPoints = null;
    this.consumedPoints = null;

    this.init = function() {
        this.parseTitle();
        this.displayEstimatedPointsBadge();
        this.displayConsumedPointsBadge();
        this.displayFormattedTitle();
    };

    this.parseTitle = function() {
        var $title = this.$element.find('a.list-card-title');
        this.title = $title[0].childNodes[$title[0].childNodes.length - 1].textContent;

        var parsedEstimated = this.title.match(reg);
        this.estimatedPoints = parsedEstimated ? parsedEstimated[2] : null;

        var parsedConsumed = this.title.match(regC);
        this.consumedPoints = parsedConsumed ? parsedConsumed[2] : null;
    };

    this.displayEstimatedPointsBadge = function() {
        var $badge = $('<div class="badge badge-points point-count" style="background-image: url(' + iconUrl + ')"/>');

        $badge
            .text(this.estimatedPoints)
            .attr({title: 'This card has ' + this.estimatedPoints + ' storypoint' + (this.estimatedPoints == 1 ? '.' : 's.')})
            .prependTo(this.$element.find('.badges'))
        ;
    };

    this.displayConsumedPointsBadge = function() {
        var $badge = $('<div class="badge badge-points point-count" style="background-image: url(' + iconUrl + ')"/>');

        $badge
            .text(this.consumedPoints)
            .addClass('consumed')
            .attr({title: 'This card has consumed ' + this.consumedPoints + ' storypoint' + (this.consumedPoints == 1 ? '.' : 's.')})
            .prependTo(this.$element.find('.badges'))
        ;
    };

    this.displayFormattedTitle = function() {
        var parsedTitle = $.trim(this.title.replace(reg, '$1').replace(regC, '$1'));
        var $title = this.$element.find('a.list-card-title');
        $title[0].childNodes[$title[0].childNodes.length - 1].textContent = parsedTitle
    }
}

var lists = [];
$(document).on('ready', function() {
    $('.list').each(function() {
        var list = new List($(this));

        $(this).find('.list-card:not(.placeholder)').each(function() {
            var card = new Card($(this));
            card.init();

            list.cards.push(card);
        });

        lists.push(list);
    });
});

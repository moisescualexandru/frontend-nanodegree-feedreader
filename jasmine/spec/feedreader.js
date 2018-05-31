/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements.
 */
$(function() {

    /* Test suite named "RSS Feeds" */
    describe('RSS Feeds', function() {
        /* This test to makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL exist', function() {
            for (obj of allFeeds) {
                expect(obj.url).toBeDefined();
                expect(obj.url.length).not.toBe(0);
            }
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name exists', function() {
            for (obj of allFeeds) {
                expect(obj.name).toBeDefined();
                expect(obj.name.length).not.toBe(0);
            }
         })
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */
        it('menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. 
          */
        it('menu reacting to clicks', function() {
            var menuButton = $('.icon-list');

            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /*Test suite named "Initial Entries" */
    describe ('Initial Entries', function() {
        var container = $('.feed');

        beforeEach (function(done) {
            loadFeed(0, function() {
                done();
            });
         });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('feed should have at least an entry', function(done) {
            expect($('.feed .entry-link').length).toBeGreaterThan(0);
            done();
         });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var container = $('.feed'),
            initialFeed, // counter that stores the number of feeds already loaded
            secondFeed; //counter that increments after each feed is loaded

        /* Loading the first 2 feeds */
        beforeEach (function(done) {
            loadFeed(0, function() {
                initialFeed = container.html();
                loadFeed(1, function() {
                    secondFeed = container.html();
                    done();
                });
            });
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
         it('the content should change when a new feed loads', function (done) {
            expect(secondFeed === initialFeed).toBe(false);
            done();
         });
    });
}());

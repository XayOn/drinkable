import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class UserPage {
    public listItems: UserListItem[] = [
        {
            title: 'user.cocktails-title',
            subtitle: 'user.cocktails-subtitle',
            iconView: './../../components/icons/icon-wine.html',
            route: 'user-cocktails'
        },
        {
            title: 'user.ingredients-title',
            subtitle: 'user.ingredients-subtitle',
            iconView: './../../components/icons/icon-leaf.html',
            route: 'user-ingredients'
        },
        {
            title: 'user.tags-title',
            subtitle: 'user.tags-subtitle',
            iconView: './../../components/icons/icon-bookmark.html',
            route: 'user-tags'
        },
        {
            title: 'cocktail-maker.title',
            subtitle: 'cocktail-maker.subtitle',
            newBadge: false,
            iconView: './../../components/icons/icon-reader.html',
            route: 'user-cocktail-maker'
        },
        {
            title: 'shopping-list.title',
            subtitle: 'shopping-list.subtitle',
            newBadge: true,
            iconView: './../../components/icons/icon-reader.html',
            route: 'user-shopping-lists'
        }
    ];

    public otherListItems: UserListItem[] = process.env.SUPABASE_KEY
        ? [
              {
                  title: 'user.settings-title',
                  subtitle: 'user.settings-subtitle',
                  iconView: './../../components/icons/icon-settings.html',
                  route: 'settings'
              },
              {
                  title: 'user.contact-title',
                  subtitle: 'user.contact-subtitle',
                  iconView: './../../components/icons/icon-mail.html',
                  route: 'contact'
              }
          ]
        : [
              {
                  title: 'user.settings-title',
                  subtitle: 'user.settings-subtitle',
                  iconView: './../../components/icons/icon-settings.html',
                  route: 'settings'
              }
          ];

    constructor(private _router: Router) {}

    navigateToRoute(route: string) {
        this._router.navigateToRoute(route);
    }
}

export interface UserListItem {
    title: string;
    subtitle: string;
    iconView: string;
    route: string;
    newBadge?: boolean;
}

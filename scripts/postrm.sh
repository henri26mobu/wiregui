#!/bin/bash
# Supprimer la policy polkit
rm -f /usr/share/polkit-1/actions/org.wiregui.toggle.policy
# Supprimer la règle sudoers
rm -f /etc/sudoers.d/wiregui

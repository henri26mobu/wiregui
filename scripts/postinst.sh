#!/bin/bash
SUDOERS_FILE="/etc/sudoers.d/wiregui"
echo "ALL ALL=(ALL) NOPASSWD: /usr/bin/wg" > "$SUDOERS_FILE"
chmod 0440 "$SUDOERS_FILE"

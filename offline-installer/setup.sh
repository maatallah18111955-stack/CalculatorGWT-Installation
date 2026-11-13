#!/bin/bash
# CalculatorGWT - Installateur Linux
set -e

APP_NAME="CalculatorGWT"
INSTALL_DIR="$HOME/.local/share/$APP_NAME"
DESKTOP_FILE="$HOME/.local/share/applications/$APP_NAME.desktop"

echo "Installation de $APP_NAME..."

mkdir -p "$INSTALL_DIR"

# Copie des fichiers WAR (fournis avec le paquet)
cp -r "$(dirname "$0")/web-app/war/"* "$INSTALL_DIR/"

# Création du lanceur desktop
cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Type=Application
Name=CalculatorGWT
Exec=xdg-open "$INSTALL_DIR/CalculatorGWT.html"
Icon=$INSTALL_DIR/logo.png
Terminal=false
Categories=Utility;Calculator;
EOF

chmod +x "$DESKTOP_FILE"
echo "✅ $APP_NAME installé dans $INSTALL_DIR"
echo "Lancez-le depuis le menu ou : xdg-open $INSTALL_DIR/CalculatorGWT.html"